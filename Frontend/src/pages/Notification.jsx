import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";


const API = "http://localhost:3000/api/notifications";


const TYPE_META = {
  APPOINTMENT_BOOKED: {
    icon: "📋",
    label: "Booked",
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    category: "appointments"
  },
  APPOINTMENT_CONFIRMED: {
    icon: "✅",
    label: "Confirmed",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    category: "appointments"
  },
  APPOINTMENT_CANCELLED: {
    icon: "❌",
    label: "Cancelled",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    category: "appointments"
  },
  APPOINTMENT_RESCHEDULED: {
    icon: "🔄",
    label: "Rescheduled",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    category: "appointments"
  },
  APPOINTMENT_REMINDER: {
    icon: "⏰",
    label: "Reminder",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    category: "appointments"
  },
  DOCTOR_AVAILABLE: {
    icon: "👨‍⚕️",
    label: "Available",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    category: "doctors"
  },
  DOCTOR_UNAVAILABLE: {
    icon: "🚫",
    label: "Unavailable",
    color: "#9f1239",
    bg: "#fff1f2",
    border: "#fecdd3",
    category: "doctors"
  },
  PAYMENT_CONFIRMED: {
    icon: "💳",
    label: "Paid",
    color: "#15803d",
    bg: "#f0fdf4",
    border: "#86efac",
    category: "payments"
  },
  PAYMENT_FAILED: {
    icon: "⚠️",
    label: "Failed",
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fcd34d",
    category: "payments"
  },
  PRESCRIPTION_READY: {
    icon: "💊",
    label: "Prescription",
    color: "#0e7490",
    bg: "#ecfeff",
    border: "#67e8f9",
    category: "medical"
  },
  LAB_RESULTS_READY: {
    icon: "🔬",
    label: "Lab Results",
    color: "#4338ca",
    bg: "#eef2ff",
    border: "#c7d2fe",
    category: "medical"
  },
  NEW_MESSAGE: {
    icon: "💬",
    label: "Message",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
    category: "messages"
  },
  REVIEW_REQUEST: {
    icon: "⭐",
    label: "Review",
    color: "#a16207",
    bg: "#fefce8",
    border: "#fef08a",
    category: "general"
  },
  SYMPTOM_ANALYSIS_RESULT: {
    icon: "🔍",
    label: "Analysis",
    color: "#7e22ce",
    bg: "#faf5ff",
    border: "#e9d5ff",
    category: "medical"
  },
  GENERAL: {
    icon: "🔔",
    label: "General",
    color: "#64748b",
    bg: "#f8fafc",
    border: "#e2e8f0",
    category: "general"
  }
};

const TABS = [
  { key: "all", label: "All" },
  { key: "appointments", label: "Appointments" },
  { key: "doctors", label: "Doctors" },
  { key: "payments", label: "Payments" },
  { key: "medical", label: "Medical" },
  { key: "messages", label: "Messages" },
];


const getMeta = (type) => TYPE_META[type] || TYPE_META.GENERAL;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};


const Badge = ({ count }) =>
  count > 0 ? (
    <span style={styles.badge}>{count > 99 ? "99+" : count}</span>
  ) : null;

const TypeTag = ({ type }) => {
  const meta = getMeta(type);
  return (
    <span
      style={{
        ...styles.typeTag,
        color: meta.color,
        background: meta.bg,
        border: `1px solid ${meta.border}`
      }}
    >
      {meta.label}
    </span>
  );
};

const EmptyState = ({ activeTab }) => (
  <div style={styles.emptyState}>
    <div style={styles.emptyIcon}>
      {activeTab === "appointments" ? "📅" :
       activeTab === "payments" ? "💳" :
       activeTab === "medical" ? "🏥" :
       activeTab === "messages" ? "💬" :
       activeTab === "doctors" ? "👨‍⚕️" : "🔔"}
    </div>
    <p style={styles.emptyTitle}>No notifications here</p>
    <p style={styles.emptySubtitle}>
      {activeTab === "all"
        ? "You're all caught up! New notifications will appear here."
        : `No ${activeTab} notifications yet.`}
    </p>
  </div>
);


const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const userId = localStorage.getItem("userId");
  const LIMIT = 10;

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({ page, limit: LIMIT });
      const response = await axios.get(`${API}/user/${userId}`, { params });
      if (response.data.success) {
        setNotifications(response.data.notifications);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch {
      setError("Failed to fetch notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userId, page]);

  const fetchUnreadCount = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API}/user/${userId}/unread-count`);
      if (response.data.success) setUnreadCount(response.data.unreadCount);
    } catch {
      
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [fetchNotifications, fetchUnreadCount]);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`${API}/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`${API}/user/${userId}/read-all`);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      
    }
  };

  const deleteNotification = async (notificationId) => {
    setDeletingId(notificationId);
    try {
      await axios.delete(`${API}/${notificationId}`);
      const deleted = notifications.find((n) => n.id === notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      if (deleted && !deleted.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch {
      
    } finally {
      setDeletingId(null);
    }
  };

  const clearAll = async () => {
    if (!window.confirm("Clear all notifications?")) return;
    try {
      await axios.delete(`${API}/user/${userId}/all`);
      setNotifications([]);
      setUnreadCount(0);
    } catch {
      
    }
  };

 
  const filtered =
    activeTab === "all"
      ? notifications
      : notifications.filter(
          (n) => getMeta(n.type).category === activeTab
        );

 
  if (!userId) {
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔒</div>
            <p style={styles.emptyTitle}>Please log in</p>
            <p style={styles.emptySubtitle}>Log in to view your notifications.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.heading}>
            Notifications
            <Badge count={unreadCount} />
          </h1>
          <p style={styles.subheading}>Stay updated on your health journey</p>
        </div>
        <div style={styles.headerActions}>
          {unreadCount > 0 && (
            <button style={styles.btnSecondary} onClick={markAllAsRead}>
              ✓ Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button style={styles.btnDanger} onClick={clearAll}>
              🗑 Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={styles.tabsBar}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.key === "all" && notifications.length > 0 && (
              <span style={styles.tabCount}>{notifications.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div style={styles.body}>
        {loading ? (
          <div style={styles.spinnerWrap}>
            <div style={styles.spinner} />
            <p style={styles.emptySubtitle}>Loading notifications…</p>
          </div>
        ) : error ? (
          <div style={styles.errorBox}>
            <span>⚠️ {error}</span>
            <button style={styles.retryBtn} onClick={fetchNotifications}>
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState activeTab={activeTab} />
        ) : (
          <div style={styles.list}>
            {filtered.map((n) => {
              const meta = getMeta(n.type);
              return (
                <div
                  key={n.id}
                  style={{
                    ...styles.item,
                    borderLeft: `4px solid ${n.isRead ? "#e2e8f0" : meta.color}`,
                    background: n.isRead ? "#fff" : meta.bg,
                    opacity: deletingId === n.id ? 0.4 : 1,
                    transition: "opacity 0.2s"
                  }}
                >
                  {/* Unread dot */}
                  {!n.isRead && (
                    <span
                      style={{
                        ...styles.unreadDot,
                        background: meta.color
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div style={styles.iconWrap}>
                    <span
                      style={{
                        ...styles.iconCircle,
                        background: meta.bg,
                        border: `1px solid ${meta.border}`
                      }}
                    >
                      {meta.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={styles.content}>
                    <div style={styles.contentTop}>
                      <h3
                        style={{
                          ...styles.title,
                          fontWeight: n.isRead ? 500 : 700,
                          color: n.isRead ? "#64748b" : "#0f172a"
                        }}
                      >
                        {n.title}
                      </h3>
                      <TypeTag type={n.type} />
                    </div>
                    <p style={styles.message}>{n.message}</p>
                    <p style={styles.time}>{formatDate(n.createdAt)}</p>
                  </div>

                  {/* Actions */}
                  <div style={styles.actions}>
                    {!n.isRead && (
                      <button
                        style={styles.readBtn}
                        onClick={() => markAsRead(n.id)}
                        title="Mark as read"
                      >
                        ✓
                      </button>
                    )}
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteNotification(n.id)}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && !loading && (
          <div style={styles.pagination}>
            <button
              style={{
                ...styles.pageBtn,
                opacity: page === 1 ? 0.4 : 1
              }}
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Prev
            </button>
            <span style={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              style={{
                ...styles.pageBtn,
                opacity: page === totalPages ? 0.4 : 1
              }}
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
// This is the Styles
const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e8f4fd 50%, #faf5ff 100%)",
    padding: "32px 16px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
  },
  header: {
    maxWidth: 760,
    margin: "0 auto 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 12
  },
  headerLeft: { display: "flex", flexDirection: "column", gap: 4 },
  heading: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    gap: 10,
    letterSpacing: "-0.5px"
  },
  subheading: { margin: 0, fontSize: 14, color: "#64748b" },
  headerActions: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  badge: {
    background: "#ef4444",
    color: "#fff",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 7px",
    minWidth: 20,
    textAlign: "center"
  },
  btnSecondary: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#fff",
    color: "#334155",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer"
  },
  btnDanger: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid #fecaca",
    background: "#fff",
    color: "#dc2626",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer"
  },
  tabsBar: {
    maxWidth: 760,
    margin: "0 auto 20px",
    display: "flex",
    gap: 4,
    overflowX: "auto",
    padding: "4px 0",
    scrollbarWidth: "none"
  },
  tab: {
    padding: "7px 14px",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    color: "#64748b",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 6,
    transition: "all 0.15s"
  },
  tabActive: {
    background: "#fff",
    color: "#0ea5e9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
  },
  tabCount: {
    background: "#e2e8f0",
    color: "#64748b",
    borderRadius: 999,
    fontSize: 11,
    padding: "1px 6px",
    fontWeight: 700
  },
  body: { maxWidth: 760, margin: "0 auto" },
  spinnerWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 0",
    gap: 16
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "3px solid #e2e8f0",
    borderTopColor: "#0ea5e9",
    animation: "spin 0.8s linear infinite"
  },
  errorBox: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 12,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#dc2626",
    fontSize: 14
  },
  retryBtn: {
    padding: "6px 14px",
    borderRadius: 6,
    border: "1px solid #fecaca",
    background: "#fff",
    color: "#dc2626",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 13
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10
  },
  emptyIcon: { fontSize: 52, lineHeight: 1 },
  emptyTitle: { margin: 0, fontSize: 18, fontWeight: 700, color: "#334155" },
  emptySubtitle: { margin: 0, fontSize: 14, color: "#94a3b8", maxWidth: 280 },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  item: {
    background: "#fff",
    borderRadius: 14,
    padding: "16px 16px 16px 20px",
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    position: "relative",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.2s"
  },
  unreadDot: {
    position: "absolute",
    top: 18,
    right: 52,
    width: 8,
    height: 8,
    borderRadius: "50%"
  },
  iconWrap: { flexShrink: 0, paddingTop: 2 },
  iconCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderRadius: 10,
    fontSize: 20
  },
  content: { flex: 1, minWidth: 0 },
  contentTop: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 4
  },
  title: { margin: 0, fontSize: 15, lineHeight: 1.3 },
  typeTag: {
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 999,
    letterSpacing: "0.02em",
    textTransform: "uppercase"
  },
  message: { margin: "0 0 6px", fontSize: 13, color: "#475569", lineHeight: 1.5 },
  time: { margin: 0, fontSize: 12, color: "#94a3b8" },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flexShrink: 0
  },
  readBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: "1px solid #bbf7d0",
    background: "#f0fdf4",
    color: "#16a34a",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: "1px solid #fecaca",
    background: "#fef2f2",
    color: "#dc2626",
    fontSize: 11,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 28,
    paddingBottom: 16
  },
  pageBtn: {
    padding: "8px 18px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#334155",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer"
  },
  pageInfo: { fontSize: 13, color: "#64748b", fontWeight: 500 }
};

export default Notification;
