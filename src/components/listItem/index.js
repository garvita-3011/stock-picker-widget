import './style.css';

const ListItem = ({ name, value }) => <li className="list-item">
<span className="list-key">{name}</span>:
<span className="list-value">{value}</span>
</li>;

export default ListItem;
