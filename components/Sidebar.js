import Image from "next/image";
function Sidebar() {
    return (
        <>
            <Image width={300} height={100} src={'/assets/img/logo.svg'} alt="Imagen Logot"/>
        </>
    );
}

export default Sidebar;