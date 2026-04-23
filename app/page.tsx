import { redirect } from 'next/navigation';

const mainPage = async () => {
  redirect('/crm'); // or wherever you want root to go
  return null;
};

export default mainPage;
