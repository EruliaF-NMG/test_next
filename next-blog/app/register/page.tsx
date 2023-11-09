import { RegisterForm } from "./includes/RegisterForm";

export default async function BlogCreate() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
           <RegisterForm/>
        </div>
      </div>
    </section>
  );
}
