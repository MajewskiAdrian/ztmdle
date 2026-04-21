import './Header.css';
export default function Header() {
    return (
    <div className="container">
        <div className="left">
            <a href=""><img className='Logo' src="null" alt="Logo" /></a>
        </div>
        <div className="right">
            <img src="null" alt="" />
            <a href=""><img className="Znaczek" src="null" alt="Znaczek" /></a>
        </div>
    </div>
    )
}