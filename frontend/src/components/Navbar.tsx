export default function Navbar() {
    return (
        <div className="flex justify-between px-20 p-5 border-b-white/60 [border-bottom-width:0.1px]"
        >
            <div className="text-lg font-bold">CodeUs</div>
            <div className="flex gap-10 text-sm">
                <div className="flex gap-5 opacity-60">
                    <button>Room</button>
                    <button>Room</button>
                    <button>Room</button>
                </div>
                <div className="w-px bg-white"></div>
                <div className="flex gap-5">
                    <button>Log in</button>
                    <button
                    className="bg-white opacity-100 rounded-md px-4 text-black"
                    >Sign up</button>
                </div>
            </div>
        </div>
    )
}