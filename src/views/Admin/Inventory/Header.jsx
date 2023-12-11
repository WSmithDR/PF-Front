import Title from "./Title"

const Header = ({ titles }) => {
    return (
        <thead className="bg-gray-100">
            <tr>
                {titles.map((title, index) => (
                    <Title key={index} title={title}/>
                ))}
            </tr>
        </thead>
    )
}

export default Header