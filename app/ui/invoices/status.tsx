import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { t } from '@/app/lib/i18n/i18n';

type InvoiceStatusType = 'pending' | 'paid';

export default function InvoiceStatus({
  lang,
  status,
}: {
  lang: 'id' | 'en';
  status: InvoiceStatusType;
}) {
  const tr = t(lang);

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'pending' && (
        <>
          {tr.pendingStatus}
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      )}

      {status === 'paid' && (
        <>
          {tr.paidStatus}
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      )}
    </span>
  );
}
