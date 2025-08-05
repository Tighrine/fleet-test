import { Link } from "react-router-dom";

type NavLinkProps = {
    to: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    activePathname?: string;
};

function NavLink({ to, children, icon, activePathname }: NavLinkProps) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem' }}>
            {icon}
            <Link to={to} style={{ fontWeight: activePathname === to ? 'bold' : 'normal' }} >{children}</Link>
        </div>
    )
}

export default NavLink