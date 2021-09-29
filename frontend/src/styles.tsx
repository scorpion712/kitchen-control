import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: '4rem',
        padding: '1rem'
    },
    margin: {
        margin: theme.spacing(1),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: '4rem',
        backgroundColor: "#17202a"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        height: '4rem',
        backgroundColor: "#17202a"
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: "#073f73"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: "#5d6d7e",
        color: "#FFF",
        fontWeight: 600
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        backgroundColor: "#34495e",
        color: "#FFF",
        fontWeight: 600
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    tableRow: {
        backgroundColor: "#212f3d",
    },
    tableCellHead: {
        fontWeight: 700,
        fontSize: '1.3rem',
        color: "#cccccc"
    },
    tableCell: {
        fontSize: '1.2rem',
        color: "#000"
    },
    subTableCellHead: {
        fontWeight: 700,
        fontSize: '1.3rem',
        color: "#cccccc",
        backgroundColor: "#212f3d",
    },
    subTableCell: {
        fontSize: '1.1rem',
        color: "#000"
    },
    tablePagination: {
        fontSize: '1rem',
        color: "#cccccc",
        backgroundColor: "#2c3e50",
    },
    searchDiv: {
        display: 'flex',
        marginLeft: '4rem',
        marginTop: '4rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

    }, 
    addButton: { 
        color: '#117864',
        fontWeight: 500,
        fontSize: '1.7rem'
    },
    search: {
        fontSize: '1.5rem'
    },
}));


export default useStyles;
