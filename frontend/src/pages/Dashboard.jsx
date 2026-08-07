import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

    const { user, loading } = useAuth();
    console.log("User in Dashboard:", user);


    if(loading){
        return <Loading/>;
    }
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