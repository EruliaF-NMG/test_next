import { Table } from "@/app/components/common/table/Table";
import { Tabs } from "@/app/components/common/tabs/Tabs";
import { getPermissionAPI } from "@/config/api-end-opints";
import { ManageProfileNavi } from "@/config/navigation";
import { getData } from "@/lib/reqvest_data/get-data";



export default async function Page() {
    const data = await getData(getPermissionAPI);
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
             <Tabs
                tabItms={ManageProfileNavi}
                activeTabKey="permission"
             />
             <Table
                tablehead={[{
                  key:"name",
                  label:"Name",
                  renderElemnt:()=>null
                },{
                  key:"key",
                  label:"Display Key",
                  renderElemnt:()=>null
                }]}
                body={data}
             />
          </div>
        </div>
      </section>
    );
  }
  