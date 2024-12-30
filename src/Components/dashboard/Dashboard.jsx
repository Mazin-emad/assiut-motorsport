import MembersList from "./components/MembersList";
import CollectionList from "./components/CollectionList";

const Dashboard = () => {
  return (
    <div className="bg-white dark:bg-bgSection min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-textPrimary mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <section className="bg-gray-50 dark:bg-bgMain p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-textPrimary mb-4">
              Team Members
            </h2>

            <MembersList />
          </section>
          <section className="bg-gray-50 dark:bg-bgMain p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-textPrimary mb-4">
              Gallery Collections
            </h2>
            <CollectionList />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
