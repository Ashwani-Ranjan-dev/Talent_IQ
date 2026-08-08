import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

    const { user, loading, logout } = useAuth();

    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const handleLogout = async () => {

        await logout();

        navigate("/");

    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">

            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="text-4xl font-bold">
                            TalentIQ Dashboard
                        </h1>

                        <p className="mt-2 text-gray-300">
                            Welcome, {user?.name}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                    >
                        Logout
                    </button>

                </div>

                <div className="mt-10">

                    <p className="text-gray-300">
                        Email: {user?.email}
                    </p>

                    <p className="text-gray-300 mt-2">
                        Role: {user?.role}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;