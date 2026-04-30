import { redirect } from 'next/navigation';

const mainPage = async () => {
  redirect('/en/crm');
  return null;
};

export default mainPage;
