import { Outlet, useLocation } from 'react-router-dom'
import NavLink from '../components/NavLink'
import { AiOutlineTeam } from "react-icons/ai";


const MainLayout = () => {
  const location = useLocation()
  const links = [
    { to: '/employees', label: 'Employees', icon: <AiOutlineTeam /> },
    { to: '/devices', label: 'Devices' }
  ]

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{
        width: '200px',
        background: '#f0f0f0',
        padding: '1rem',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <h2>Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {links.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} activePathname={location.pathname} icon={icon}>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main style={{ flexGrow: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
