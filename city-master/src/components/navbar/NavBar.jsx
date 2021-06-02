import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import HomeIcon from '@material-ui/icons/Home';
import firebase from '../../firebase/firebase'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { removePerson, removeUser } from '../../redux/userSlice';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function ScrollableTabsButtonPrevent() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userEmail } = useSelector((state) => state.user);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Link to="/signin ">Login</Link>
          <Tab icon={<HomeIcon />} aria-label="home" {...a11yProps(0)} onClick={() => (
            history.push('/')
          )}></Tab>
          {!userEmail && <Tab icon={<PersonAddIcon />} aria-label="favorite" {...a11yProps(1)} onClick={() => (
            history.push('/signup')
          )}></Tab>}
          {!userEmail && <Tab icon={<VpnKeyIcon />} aria-label="person" {...a11yProps(2)} onClick={() => (
            history.push('/signin')
          )}></Tab>}
          {userEmail && <Tab icon={<ExitToAppIcon />} aria-label="help" {...a11yProps(3)} onClick={() => {
            firebase.auth().signOut()
            dispatch(removeUser())
          }}/>}
          {userEmail && <Tab icon={<AssignmentIndIcon />} aria-label="shopping" {...a11yProps(4)} onClick={() => (
            history.push('/private-office')
          )}/>}
          {/* <Tab icon={<ThumbDown />} aria-label="up" {...a11yProps(5)} />
          <Tab icon={<ThumbUp />} aria-label="down" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
    </div>
  );
}
