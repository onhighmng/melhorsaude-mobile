import { Button } from '@/components/ui/button-1';
import { CardSean, CardContentSean, CardHeaderSean, CardTitleSean, CardToolbarSean } from '@/components/ui/card-sean';
import { BanknoteArrowUp, LucideIcon } from 'lucide-react';
import { cn } from '@/components/ui/utils';

interface CurrencyData {
  code: string;
  percent: number;
  color: string;
}

interface StatisticsCard5Props {
  title?: string;
  balance: number | string;
  delta: number;
  currencies: CurrencyData[];
  onTopupClick?: () => void;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  showButton?: boolean;
  className?: string;
}

export function StatisticsCard5({
  title = "Balance",
  balance,
  delta,
  currencies,
  onTopupClick,
  buttonText = "Topup",
  buttonIcon: ButtonIcon = BanknoteArrowUp,
  showButton = true,
  className,
}: StatisticsCard5Props) {
  return (
    <CardSean className={cn("w-full rounded-2xl shadow-xl border-0 bg-zinc-900 text-white", className)}>
      <CardHeaderSean className="border-0 pb-2 pt-6">
        <CardTitleSean className="text-lg font-semibold text-zinc-400">{title}</CardTitleSean>
        {showButton && (
          <CardToolbarSean>
            <Button 
              onClick={onTopupClick}
              className="bg-zinc-800 text-zinc-100 border-zinc-800 hover:bg-zinc-700 hover:text-zinc-100"
            >
              <ButtonIcon />
              {buttonText}
            </Button>
          </CardToolbarSean>
        )}
      </CardHeaderSean>
      <CardContentSean>
        <div className="flex items-end gap-2 mb-5">
          <span className="text-3xl font-bold tracking-tight text-white">
            {typeof balance === 'number' ? `$${balance.toLocaleString()}` : balance}
          </span>
          <span className="text-base font-semibold text-green-400 ms-2">+{delta}%</span>
        </div>

        <div className="border-b border-zinc-700 mb-6" />

        {/* Segmented Progress Bar */}
        <div className="flex items-center gap-1.5 w-full mb-3">
          {currencies.map((cur) => (
            <div
              key={cur.code}
              className="space-y-2.5"
              style={{
                width: `${cur.percent}%`,
              }}
            >
              <div className={cn(cur.color, 'h-2.5 w-full overflow-hidden rounded-sm transition-all')} />

              <div className="flex flex-col items-start flex-1">
                <span className="text-xs text-zinc-400 font-medium">{cur.code}</span>
                <span className="text-base font-semibold text-white">{cur.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContentSean>
    </CardSean>
  );
}
