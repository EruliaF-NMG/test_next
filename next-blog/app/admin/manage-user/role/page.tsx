import { Table } from "@/app/components/common/table/Table";
import { Tabs } from "@/app/components/common/tabs/Tabs";
import { getRolesAPI } from "@/config/api-end-opints";
import { ManageProfileNavi } from "@/config/navigation";
import { getData } from "@/lib/reqvest_data/get-data";
import Link from "next/link";


const PermissionsElemnt=(props:any)=>{
  return (
    <>
      {props.data.permissions.map((permission:any,index:number)=>permission.name).join()}
    </>
  )
}

const ActionElemnt=(props:any)=>{
  return (
    <Link 
      href={`/admin/manage-user/role/${props.data.id}`}
      className="text-blue-600 dark:text-blue-500 hover:underline"
    >
      Manage Role's Permission
    </Link>
  )
}



export default async function Page() {
    const data = await getData(getRolesAPI);
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
             <Tabs
                tabItms={ManageProfileNavi}
                activeTabKey="role"
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
                },{
                  key:"permissions",
                  label:"Permissions",
                  renderElemnt:(data:any)=> {
                    return <PermissionsElemnt data={data} />
                  }
                },{
                  key:"action",
                  label:"Action",
                  renderElemnt:(data:any)=> {
                    return <ActionElemnt data={data} />
                  }
                }]}
                body={data}
             />
          </div>
        </div>
      </section>
    );
  }
  