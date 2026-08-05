function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">

            <h1 className="text-5xl font-bold">

                TalentIQ Dashboard

            </h1>

            <h2 className="text-2xl mt-6">

                Welcome,

                {user?.name}

            </h2>

            <p className="mt-2">

                Role :

                {user?.role}

            </p>

        </div>

    );

}

export default Dashboard;