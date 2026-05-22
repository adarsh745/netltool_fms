

interface NavbarProps {
    options:any;
    title:string;
    logo:string;
}

const Navbar = ({logo, options, title}:NavbarProps)=>{
    return <div className="text-xl font-bold">
        {title}
    </div> 
}

export default Navbar;