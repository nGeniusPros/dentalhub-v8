import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Notification, NotificationState } from "../types/notification";
import { supabase } from '@/lib/supabaseClient'

type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_AS_READ"; payload: string }
  | {
      type: "UPDATE_NOTIFICATION";
      payload: { id: string; updates: Partial<Notification> };
    }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_ALL" };

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    case "MARK_AS_READ":
      return {
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification,
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case "UPDATE_NOTIFICATION":
      return {
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload.id
            ? { ...notification, ...action.payload.updates }
            : notification,
        ),
        unreadCount: state.notifications.filter((n) => !n.read).length,
      };
    case "MARK_ALL_AS_READ":
      return {
        notifications: state.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
        unreadCount: 0,
      };
    case "REMOVE_NOTIFICATION":
      return {
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload,
        ),
        unreadCount: state.notifications.find(
          (n) => n.id === action.payload && !n.read,
        )
          ? state.unreadCount - 1
          : state.unreadCount,
      };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

const NotificationContext = createContext<
  | {
      state: NotificationState;
      dispatch: React.Dispatch<NotificationAction>;
      fetchNotifications: (userId: string) => Promise<Notification[]>;
      markNotificationRead: (notificationId: string) => Promise<void>;
    }
  | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const fetchNotifications = async (userId: string) => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  const markNotificationRead = async (notificationId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)

    if (error) throw error
  }

  useEffect(() => {
    const userId = supabase.auth.user()?.id
    if (userId) {
      fetchNotifications(userId).then(notifications => {
        dispatch({ type: 'ADD_NOTIFICATION', payload: notifications })
      })
    }
  }, [])

  return (
    <NotificationContext.Provider value={{ state, dispatch, fetchNotifications, markNotificationRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
