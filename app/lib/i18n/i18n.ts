export const translations = {
  en: {
    // ================= NAV / GENERAL =================
    dashboard: 'Dashboard',
    customers: 'Customers',
    invoices: 'Invoices',
    signOut: 'Sign Out',

    // ================= DASHBOARD =================
    recentRevenue: 'Recent Revenue',
    latestInvoices: 'Latest Invoices',
    totalCustomers: 'Total Customers',
    totalInvoices: 'Total Invoices',
    collected: 'Collected',
    paid: 'Paid',
    pending: 'Pending',

    // ================= STATUS / INFO =================
    noData: 'No data available.',
    lastMonths: 'Last months',
    updatedJustNow: 'Updated just now',
    loading: 'Loading...',

    // ================= TABLE / CUSTOMERS =================
    name: 'Name',
    email: 'Email',
    totalPending: 'Total Pending',
    totalPaid: 'Total Paid',

    // ================= PAGINATION =================
    prev: 'Prev',
    next: 'Next',
    page: 'Page',
    of: 'of',

    // ================= ACTIONS =================
    createInvoice: 'Create Invoice',
    editInvoice: 'Edit Invoice',
    newInvoice: 'New Invoice',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',

    // ================= SEARCH =================
    searchInvoices: 'Search invoices...',
    searchCustomers: 'Search customers...',

    // ================= LANDING PAGE =================
    welcome: 'Welcome!',
    landingDesc: 'This is a learning website for the',
    courseName: 'Web Technology course',
    lecturer: 'Lecturer: ',
    lecturerName: 'Adhitya Ahmad Pradypta, S.Kom., M.T.I.',
    login: 'Log in',

    // ================= LOGIN =================
    loginTitle: 'Please log in to continue.',
    enterEmail: 'Enter your email address',
    password: 'Password',
    enterPassword: 'Enter password',

    // ================= INVOICE FORM =================
    customer: 'Customer',
    selectCustomer: 'Select customer',
    amount: 'Amount',
    date: 'Date',
    enterAmount: 'Enter amount',
    status: 'Status',
    paidStatus: 'Paid',
    pendingStatus: 'Pending',

    // ================= BREADCRUMB =================
    home: 'Home',
  },

  id: {
    // ================= NAV / GENERAL =================
    dashboard: 'Dashboard',
    customers: 'Pelanggan',
    invoices: 'Tagihan',
    signOut: 'Keluar',

    // ================= DASHBOARD =================
    recentRevenue: 'Pendapatan Terbaru',
    latestInvoices: 'Tagihan Terbaru',
    totalCustomers: 'Total Pelanggan',
    totalInvoices: 'Total Tagihan',
    collected: 'Terkumpul',
    paid: 'Lunas',
    pending: 'Menunggu',

    // ================= STATUS / INFO =================
    noData: 'Tidak ada data.',
    lastMonths: 'Bulan terakhir',
    updatedJustNow: 'Baru saja diperbarui',
    loading: 'Memuat...',

    // ================= TABLE / CUSTOMERS =================
    name: 'Nama',
    email: 'Email',
    totalPending: 'Total Menunggu',
    totalPaid: 'Total Lunas',

    // ================= PAGINATION =================
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    page: 'Halaman',
    of: 'dari',

    // ================= ACTIONS =================
    createInvoice: 'Buat Tagihan',
    editInvoice: 'Ubah Tagihan',
    newInvoice: 'Tagihan Baru',
    save: 'Simpan',
    cancel: 'Batal',
    edit: 'Ubah',
    delete: 'Hapus',

    // ================= SEARCH =================
    searchInvoices: 'Cari tagihan...',
    searchCustomers: 'Cari pelanggan...',

    // ================= LANDING PAGE =================
    welcome: 'Selamat Datang!',
    landingDesc: 'Ini adalah situs web pembelajaran untuk',
    courseName: 'mata kuliah Web Teknologi',
    lecturer: 'Dosen Pengampu: ',
    lecturerName: 'Adhitya Ahmad Pradypta, S.Kom., M.T.I.',
    login: 'Masuk',

    // ================= LOGIN =================
    loginTitle: 'Silakan masuk untuk melanjutkan.',
    enterEmail: 'Masukkan alamat email',
    password: 'Kata sandi',
    enterPassword: 'Masukkan kata sandi',

    // ================= INVOICE FORM =================
    customer: 'Pelanggan',
    selectCustomer: 'Pilih pelanggan',
    amount: 'Jumlah',
    date: 'Tanggal',
    enterAmount: 'Masukkan jumlah',
    status: 'Status',
    paidStatus: 'Lunas',
    pendingStatus: 'Menunggu',

    // ================= BREADCRUMB =================
    home: 'Beranda',
  },
} as const;

export type Lang = 'id' | 'en';

export function t(lang: Lang) {
  return translations[lang];
}
