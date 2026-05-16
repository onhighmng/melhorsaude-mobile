import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
  Dimensions, StatusBar, Modal, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Video, Audio, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2 } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { Resource } from '@/hooks/use-resources';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '@/lib/design-tokens';

const { width: SW, height: SH } = Dimensions.get('window');

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ── Video Player ──────────────────────────────────────────────────────────────

function VideoPlayer({ url, title }: { url: string; title: string }) {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded && status.durationMillis ? status.durationMillis : 1;
  const progress = position / duration;

  const resetHideTimer = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setShowControls(true);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, []);

  const togglePlay = async () => {
    if (!videoRef.current) return;
    resetHideTimer();
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      if (status?.isLoaded && status.didJustFinish) {
        await videoRef.current.replayAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const seek = async (ratio: number) => {
    if (!videoRef.current || !status?.isLoaded || !status.durationMillis) return;
    resetHideTimer();
    await videoRef.current.setPositionAsync(ratio * status.durationMillis);
  };

  return (
    <View style={vStyles.container}>
      <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFillObject} onPress={resetHideTimer}>
        <Video
          ref={videoRef}
          source={{ uri: url }}
          style={StyleSheet.absoluteFillObject}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={setStatus}
          useNativeControls={false}
          shouldPlay={false}
        />
      </TouchableOpacity>

      {/* Controls overlay */}
      {showControls && (
        <View style={vStyles.overlay}>
          {/* Title */}
          <Text style={vStyles.title} numberOfLines={2}>{title}</Text>

          {/* Centre play button */}
          <TouchableOpacity style={vStyles.playBtn} onPress={togglePlay} activeOpacity={0.8}>
            {isPlaying
              ? <Pause size={28} color="#fff" fill="#fff" />
              : <Play size={28} color="#fff" fill="#fff" />
            }
          </TouchableOpacity>

          {/* Bottom: time + scrubber */}
          <View style={vStyles.bottomBar}>
            <Text style={vStyles.timeText}>{formatTime(position)}</Text>
            <TouchableOpacity
              style={vStyles.scrubberTrack}
              activeOpacity={1}
              onPress={(e) => seek(e.nativeEvent.locationX / (SW - 80))}
            >
              <View style={[vStyles.scrubberFill, { width: `${progress * 100}%` as any }]} />
              <View style={[vStyles.scrubberThumb, { left: `${progress * 100}%` as any }]} />
            </TouchableOpacity>
            <Text style={vStyles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      )}

      {/* Loading indicator */}
      {status && !status.isLoaded && (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#fff" size="large" />
      )}
    </View>
  );
}

const vStyles = StyleSheet.create({
  container: { width: SW, height: SW * (9 / 16), backgroundColor: '#000' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    color: '#fff',
    fontSize: 14,
    fontFamily: TYPOGRAPHY.JAKARTA_700,
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeText: { color: '#fff', fontSize: 12, fontFamily: TYPOGRAPHY.JAKARTA_700, width: 40, textAlign: 'center' },
  scrubberTrack: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  scrubberFill: { height: 3, backgroundColor: COLORS.PRIMARY, borderRadius: 2 },
  scrubberThumb: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    top: 3,
    marginLeft: -7,
  },
});

// ── Audio Player ──────────────────────────────────────────────────────────────

function AudioPlayer({ url, title }: { url: string; title: string }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded && status.durationMillis ? status.durationMillis : 1;
  const progress = position / duration;

  useEffect(() => {
    let sound: Audio.Sound;
    (async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound: s } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: false },
        setStatus,
      );
      sound = s;
      soundRef.current = s;
      setLoading(false);
    })();
    return () => { sound?.unloadAsync(); };
  }, [url]);

  const togglePlay = async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      if (status?.isLoaded && status.didJustFinish) {
        await soundRef.current.replayAsync();
      } else {
        await soundRef.current.playAsync();
      }
    }
  };

  const seek = async (ratio: number) => {
    if (!soundRef.current || !status?.isLoaded || !status.durationMillis) return;
    await soundRef.current.setPositionAsync(ratio * status.durationMillis);
  };

  return (
    <View style={aStyles.container}>
      <View style={aStyles.iconWrap}>
        <Volume2 size={48} color={COLORS.PRIMARY} />
      </View>
      <Text style={aStyles.title} numberOfLines={3}>{title}</Text>

      {/* Scrubber */}
      <View style={aStyles.scrubberRow}>
        <Text style={aStyles.timeText}>{formatTime(position)}</Text>
        <TouchableOpacity
          style={aStyles.scrubberTrack}
          activeOpacity={1}
          onPress={(e) => seek(e.nativeEvent.locationX / (SW - 120))}
        >
          <View style={aStyles.scrubberBg} />
          <View style={[aStyles.scrubberFill, { width: `${progress * 100}%` as any }]} />
          <View style={[aStyles.scrubberThumb, { left: `${progress * 100}%` as any }]} />
        </TouchableOpacity>
        <Text style={aStyles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Play button */}
      {loading ? (
        <ActivityIndicator color={COLORS.PRIMARY} size="large" style={{ marginTop: 24 }} />
      ) : (
        <TouchableOpacity style={aStyles.playBtn} onPress={togglePlay} activeOpacity={0.85}>
          {isPlaying
            ? <Pause size={28} color="#fff" fill="#fff" />
            : <Play size={28} color="#fff" fill="#fff" />
          }
        </TouchableOpacity>
      )}
    </View>
  );
}

const aStyles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.xl },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.PRIMARY + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 22,
    fontFamily: TYPOGRAPHY.JAKARTA_700,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 30,
  },
  scrubberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
    marginBottom: SPACING.xl,
  },
  timeText: { fontSize: 12, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_SECONDARY, width: 40, textAlign: 'center' },
  scrubberTrack: { flex: 1, height: 24, justifyContent: 'center', position: 'relative' },
  scrubberBg: { height: 4, backgroundColor: COLORS.CARD_EL, borderRadius: 2 },
  scrubberFill: { position: 'absolute', height: 4, backgroundColor: COLORS.PRIMARY, borderRadius: 2 },
  scrubberThumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY,
    top: 4,
    marginLeft: -8,
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ── Article Viewer ────────────────────────────────────────────────────────────

function ArticleViewer({ url }: { url: string }) {
  const [loading, setLoading] = useState(true);

  // Wrap PDFs in Google Docs viewer for reliable rendering
  const resolvedUrl = url.toLowerCase().endsWith('.pdf')
    ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`
    : url;

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={artStyles.loadingOverlay}>
          <ActivityIndicator color={COLORS.PRIMARY} size="large" />
          <Text style={artStyles.loadingText}>A carregar artigo...</Text>
        </View>
      )}
      <WebView
        source={{ uri: resolvedUrl }}
        style={{ flex: 1 }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState={false}
        allowsInlineMediaPlayback
      />
    </View>
  );
}

const artStyles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.BG,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    zIndex: 1,
  },
  loadingText: { fontSize: 14, color: COLORS.TEXT_SECONDARY, fontFamily: TYPOGRAPHY.JAKARTA_400 },
});

// ── Main ResourceViewer ───────────────────────────────────────────────────────

interface Props {
  resource: Resource | null;
  onClose: () => void;
}

export function ResourceViewer({ resource, onClose }: Props) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!resource) return;
    // Increment view count
    (supabase.rpc as any)('increment_resource_view_count', { resource_id: resource.id }).catch(() => {});
  }, [resource?.id]);

  if (!resource) return null;

  const url = resource.file_url;
  const type = resource.resource_type;

  const renderContent = () => {
    if (!url) {
      return (
        <View style={s.noUrl}>
          <Text style={s.noUrlText}>Conteúdo não disponível.</Text>
        </View>
      );
    }
    if (type === 'video') return <VideoPlayer url={url} title={resource.title_pt} />;
    if (type === 'audio') return <AudioPlayer url={url} title={resource.title_pt} />;
    return <ArticleViewer url={url} />;
  };

  return (
    <Modal visible animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <StatusBar barStyle="dark-content" />
      <View style={[s.container, { paddingTop: insets.top }]}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity style={s.backBtn} onPress={onClose} activeOpacity={0.7}>
            <ArrowLeft size={22} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
          <Text style={s.headerTitle} numberOfLines={1}>{resource.title_pt}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        {type === 'video' ? (
          <View style={{ flex: 1 }}>
            {renderContent()}
            {/* Description below video */}
            {resource.description_pt ? (
              <ScrollView style={s.descScroll} contentContainerStyle={s.descContent}>
                <Text style={s.descTitle}>{resource.title_pt}</Text>
                <Text style={s.descBody}>{resource.description_pt}</Text>
              </ScrollView>
            ) : null}
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {renderContent()}
          </View>
        )}

      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BG },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
    backgroundColor: COLORS.BG,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: TYPOGRAPHY.JAKARTA_700,
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 8,
  },
  noUrl: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  noUrlText: { fontSize: 15, color: COLORS.TEXT_SECONDARY, fontFamily: TYPOGRAPHY.JAKARTA_400 },
  descScroll: { flex: 1, backgroundColor: COLORS.BG },
  descContent: { padding: SPACING.xl },
  descTitle: { fontSize: 20, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_PRIMARY, marginBottom: SPACING.md },
  descBody: { fontSize: 15, color: COLORS.TEXT_SECONDARY, lineHeight: 24, fontFamily: TYPOGRAPHY.JAKARTA_400 },
});
