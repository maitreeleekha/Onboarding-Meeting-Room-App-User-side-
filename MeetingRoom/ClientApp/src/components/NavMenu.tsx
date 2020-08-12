import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as UserStore from '../store/User';
import { connect } from 'react-redux';
import './static/NavMenu.css';
import { ApplicationState } from '../store';



type UserProps =
    UserStore.UserState
    & typeof UserStore.actionCreators
    & RouteComponentProps<{}> 


// , { isOpen: boolean }
 class NavMenu extends React.PureComponent<UserProps> {
    public state = {
        isOpen: false
     };

     username: string | null;
     userid: string | null | undefined;
     //const username = "";
     constructor(props) {
         super(props);
         this.username = sessionStorage.getItem("username") ? sessionStorage.getItem("username") : "" ;
     }



     public componentDidMount() {
     }

     public render() {
         this.username = sessionStorage.getItem("username") ? sessionStorage.getItem("username") : "";
         this.userid = sessionStorage.getItem("userid") ? sessionStorage.getItem("userid") : "";
         if (this.username) {
             let tolink = './user:' + this.userid;
             return (
                 <header>
                     <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                         <Container>
                             <NavbarBrand href={tolink} >Meeting Room</NavbarBrand>
                             <ul className="navbar-nav flex-grow">
                                 <NavItem style={{ "overflow": "auto", "marginRight":"0.5%" }}>
                                     Hi! {this.username.split(" ")[0]}
                                 </NavItem>
                                 <NavItem >
                                     <button className="btn btn-small btn-danger" onClick={(event) => {
                                         window.open('./login', '_self');
                                     }}>Logout</button>
                                 </NavItem>
                            </ul>
                         </Container>
                     </Navbar>
                 </header>
             );
         }
         else {
             return (
                 <header>
                     <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                         <Container>
                             <NavbarBrand tag={Link} to="./">Meeting Room</NavbarBrand>
                             
                         </Container>
                     </Navbar>
                 </header>
             );
         }

    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    UserStore.actionCreators
)(NavMenu);

//<NavbarToggler onClick={this.toggle} className="mr-2" />
//    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
//        <ul className="navbar-nav flex-grow">
//            <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/Index">Home</NavLink>
//            </NavItem>
//            <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
//            </NavItem>
//            <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
//            </NavItem>
//        </ul>
//    </Collapse>