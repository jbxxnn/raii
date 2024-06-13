import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
// import { tasks } from './data/tasks'
import useSWR from 'swr'


const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    return res.json().then((err) => {
      throw new Error(err.message);
    });
  }
  return res.json();
});

export default function Tasks() {
  const { data, error } = useSWR('/api/projects', fetcher);

  if (error) return <div>Failed to load tasks</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={data} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  );
}

// export default function Tasks() {
//   return (
//     <Layout>
//       {/* ===== Top Heading ===== */}
//       <LayoutHeader>
//         <Search />
//         <div className='ml-auto flex items-center space-x-4'>
//           <ThemeSwitch />
//           <UserNav />
//         </div>
//       </LayoutHeader>

//       <LayoutBody className='flex flex-col' fixedHeight>
//         <div className='mb-2 flex items-center justify-between space-y-2'>
//           <div>
//             <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
//             <p className='text-muted-foreground'>
//               Here&apos;s a list of your tasks for this month!
//             </p>
//           </div>
//         </div>
//         <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
//           <DataTable data={tasks} columns={columns} />
//         </div>
//       </LayoutBody>
//     </Layout>
//   )
// }




