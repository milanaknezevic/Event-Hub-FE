import {notification} from "antd";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {notificationObj} from "../../redux/selectors.jsx";

const Notification = () => {
    const {showMessage, message, notificationType, title} = useSelector(notificationObj);
    const getNotificationStyle = type => {
        return {
            success: {
                color: 'green',
                border: '1px solid F2F2F2',
                backgroundColor: 'F2F2F2',
                borderRadius: '10px'
            },
            error: {
                color: 'red',
                border: '1px solid F2F2F2',
                backgroundColor: 'F2F2F2',
                borderRadius: '10px'
            },
        }[type]
    }

    useEffect(() => {
        const openNotification = (type, messageText, title) => {
            notification.open({
                message: <span style={{color: getNotificationStyle(type).color}}>{title}</span>,
                description: `${messageText}`,
                placement: "bottomRight",
                style: getNotificationStyle(type),
                duration: 2,
            });
        };

        if (showMessage) {
            openNotification(notificationType, message, title);
        }
    }, [showMessage, message, notificationType, title]);

    return null;
};

export default Notification;
