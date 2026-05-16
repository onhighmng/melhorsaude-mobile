type MetadataRecord = Record<string, any>;

const isPlainObject = (value: unknown): value is MetadataRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const extractBookingMetadata = (raw: unknown): MetadataRecord => {
  if (isPlainObject(raw)) {
    return raw;
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return isPlainObject(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  return {};
};

export const isUrgentCallBooking = (booking: { metadata?: unknown } | null | undefined): boolean => {
  if (!booking) return false;
  const metadata = extractBookingMetadata((booking as any).metadata);
  return metadata?.request_type === 'urgent_call';
};

export const isPhoneSession = (booking: { meeting_type?: string | null } | null | undefined): boolean => {
  if (!booking) return false;
  const meetingType = (booking as any).meeting_type;
  return typeof meetingType === 'string' && meetingType.toLowerCase() === 'phone';
};

export const getUserPhoneFromBooking = (booking: { user?: { phone?: string | null } | null } | null | undefined): string | null => {
  const phone = booking?.user?.phone;
  if (typeof phone === 'string' && phone.trim().length > 0) {
    return phone.trim();
  }
  return null;
};


