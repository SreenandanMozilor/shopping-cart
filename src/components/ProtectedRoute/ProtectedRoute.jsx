import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import PropTypes from 'prop-types'

const PublicOnlyRoute = ({ children }) => {
  const { currentUser } = useAuth()

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  return children
}

PublicOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export default PublicOnlyRoute