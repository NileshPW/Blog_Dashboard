import avatar from "../assets/avatar.png";
export default function Navbar() {
    return (
        <header className="h-14 bg-white border-b flex items-center justify-between px-4">
            <h2 className="font-semibold">Dashboard</h2>
            <img
                src={avatar}
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
            />

        </header>
    );
}
