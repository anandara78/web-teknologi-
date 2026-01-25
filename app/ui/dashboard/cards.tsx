import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { t } from '@/app/lib/i18n/i18n';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function Cards({
  lang,
  totalPaidInvoices,
  totalPendingInvoices,
  numberOfInvoices,
  numberOfCustomers,
}: {
  lang: 'id' | 'en';
  totalPaidInvoices: string;
  totalPendingInvoices: string;
  numberOfInvoices: number;
  numberOfCustomers: number;
}) {
  const tr = t(lang);

  return (
    <>
      <Card title={tr.collected} value={totalPaidInvoices} type="collected" />
      <Card title={tr.pending} value={totalPendingInvoices} type="pending" />
      <Card title={tr.totalInvoices} value={numberOfInvoices} type="invoices" />
      <Card
        title={tr.totalCustomers}
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
