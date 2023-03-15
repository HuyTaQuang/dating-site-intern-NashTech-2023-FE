import whiteLogo from '../images/tinder-logo-white.png'
import colorLogo from '../images/tinder-logo-color.png'

const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignUp }) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? colorLogo : whiteLogo} alt="Logo" />
            </div>

            {!authToken && <button 
                className='nav-button'
                onClick={handleClick}
                disabled={showModal}
            >Log in</button>}
        </nav>
    )
}

export default Nav