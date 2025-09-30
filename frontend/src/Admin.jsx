import React, { useState } from 'react';
import { Book, Users, Bell, History, Search, BookOpen, Star, X, LogOut, User, Shield, Edit3, Save, Trash2, UserCheck, Crown } from 'lucide-react';

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    overflow: 'hidden'
  },
  sidebar: {
    width: '280px',
    background: 'linear-gradient(180deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    fontSize: '24px',
    fontWeight: '700',
    color: 'white'
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    fontWeight: '500'
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: '600'
  },
  navItemHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8fafc',
    height: '100vh',
    overflow: 'hidden'
  },
  header: {
    backgroundColor: 'white',
    padding: '20px 32px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchContainer: {
    position: 'relative',
    width: '400px'
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 20px 12px 50px',
    fontSize: '15px',
    outline: 'none',
    color: '#374151'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  searchButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#dc2626',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#dc2626',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600'
  },
  content: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto'
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '32px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: '24px 20px',
    borderRadius: '16px',
    border: '2px solid #e5e7eb',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: '8px',
    lineHeight: '1.2'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: '1.4'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '24px'
  },
  booksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '24px'
  },
  bookCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  },
  bookCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px 0 rgba(0, 0, 0, 0.15)'
  },
  bookCover: {
    width: '100%',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px'
  },
  bookInfo: {
    padding: '20px'
  },
  bookTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  bookAuthor: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: '12px'
  },
  bookStatus: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textAlign: 'center'
  },
  statusAvailable: {
    backgroundColor: '#dcfce7',
    color: '#16a34a'
  },
  statusBorrowed: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  },
  membersTable: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'grid',
    gridTemplateColumns: '80px 1fr 1fr 1fr 150px 120px',
    gap: '16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  tableRow: {
    padding: '20px',
    borderBottom: '1px solid #f3f4f6',
    display: 'grid',
    gridTemplateColumns: '80px 1fr 1fr 1fr 150px 120px',
    gap: '16px',
    fontSize: '14px',
    alignItems: 'center'
  },
  memberAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600'
  },
  roleTag: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    textAlign: 'center'
  },
  roleUser: {
    backgroundColor: '#dbeafe',
    color: '#1e40af'
  },
  roleLibrarian: {
    backgroundColor: '#dcfce7',
    color: '#16a34a'
  },
  roleAdmin: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  },
  actionButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  },
  promoteButton: {
    backgroundColor: '#16a34a',
    color: 'white'
  },
  promoteButtonHover: {
    backgroundColor: '#15803d'
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    fontWeight: '500',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none'
  },
  logoutButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
  },
  modal: {
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    width: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px'
  },
  modalText: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '24px',
    lineHeight: '1.5'
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end'
  },
  confirmButton: {
    padding: '10px 20px',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  }
};

const AdminLibrary = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@student.edu.vn',
      phone: '0123456789',
      role: 'user',
      joinDate: '2023-09-01',
      booksCount: 5
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@student.edu.vn',
      phone: '0123456790',
      role: 'user',
      joinDate: '2023-08-15',
      booksCount: 3
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@student.edu.vn',
      phone: '0123456791',
      role: 'librarian',
      joinDate: '2023-07-01',
      booksCount: 8
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@student.edu.vn',
      phone: '0123456792',
      role: 'user',
      joinDate: '2023-09-10',
      booksCount: 2
    }
  ]);

  const handleBookClick = (book) => {
    alert(`Chi tiết sách: "${book.title}" - ${book.author}\nTrạng thái: ${getStatusText(book.status)}`);
  };

  const bookColors = [
    'linear-gradient(135deg, #ff6b9d, #f06292)',
    'linear-gradient(135deg, #667eea, #764ba2)', 
    'linear-gradient(135deg, #ffeaa7, #fab1a0)',
    'linear-gradient(135deg, #74b9ff, #0984e3)',
    'linear-gradient(135deg, #fd79a8, #e84393)',
    'linear-gradient(135deg, #fdcb6e, #e17055)'
  ];

  const books = [
    { 
      id: 1, 
      title: 'Tâm lý học đám đông', 
      author: 'Gustave Le Bon', 
      color: bookColors[0],
      status: 'available'
    },
    { 
      id: 2, 
      title: 'Đắc nhân tâm', 
      author: 'Dale Carnegie', 
      color: bookColors[1],
      status: 'borrowed'
    },
    { 
      id: 3, 
      title: 'Sapiens', 
      author: 'Yuval Noah Harari', 
      color: bookColors[2],
      status: 'available'
    },
    { 
      id: 4, 
      title: 'Atomic Habits', 
      author: 'James Clear', 
      color: bookColors[3],
      status: 'available'
    },
    { 
      id: 5, 
      title: 'Think and Grow Rich', 
      author: 'Napoleon Hill', 
      color: bookColors[4],
      status: 'borrowed'
    },
    { 
      id: 6, 
      title: 'The 7 Habits', 
      author: 'Stephen Covey', 
      color: bookColors[5],
      status: 'available'
    }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: Book },
    { id: 'members', label: 'Quản lý thành viên', icon: Users },
    { id: 'notifications', label: 'Thông báo', icon: Bell }
  ];

  const handleLogout = () => {
    alert('Chuyển về trang login.jsx');
  };

  const handlePromoteMember = (member) => {
    setSelectedMember(member);
    setShowPromoteModal(true);
  };

  const confirmPromote = () => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === selectedMember.id
          ? { ...member, role: 'librarian' }
          : member
      )
    );
    setShowPromoteModal(false);
    setSelectedMember(null);
    alert(`${selectedMember.name} đã được thăng cấp thành Thủ thư!`);
  };

  const cancelPromote = () => {
    setShowPromoteModal(false);
    setSelectedMember(null);
  };

  const getRoleStyle = (role) => {
    const baseStyle = styles.roleTag;
    switch (role) {
      case 'user': return { ...baseStyle, ...styles.roleUser };
      case 'librarian': return { ...baseStyle, ...styles.roleLibrarian };
      case 'admin': return { ...baseStyle, ...styles.roleAdmin };
      default: return baseStyle;
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'user': return 'Thành viên';
      case 'librarian': return 'Thủ thư';
      case 'admin': return 'Quản trị viên';
      default: return role;
    }
  };

  const getStatusStyle = (status) => {
    const baseStyle = styles.bookStatus;
    switch (status) {
      case 'available': return { ...baseStyle, ...styles.statusAvailable };
      case 'borrowed': return { ...baseStyle, ...styles.statusBorrowed };
      default: return baseStyle;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Có sẵn';
      case 'borrowed': return 'Đã mượn';
      default: return status;
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <h1 style={styles.pageTitle}>Tổng quan</h1>
            
            {/* Statistics Cards */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{books.length}</div>
                <div style={styles.statLabel}>Tổng số sách</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{books.filter(book => book.status === 'borrowed').length}</div>
                <div style={styles.statLabel}>Sách đã mượn</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{members.length}</div>
                <div style={styles.statLabel}>Tổng thành viên</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{members.filter(member => member.role === 'librarian').length}</div>
                <div style={styles.statLabel}>Thủ thư</div>
              </div>
            </div>

            {/* Books Section */}
            <h2 style={styles.sectionTitle}>Sách phổ biến</h2>
            {searchTerm && (
              <div style={{ marginBottom: '24px', fontSize: '16px', color: '#6b7280' }}>
                Kết quả tìm kiếm: "{searchTerm}" ({filteredBooks.length} kết quả)
              </div>
            )}
            <div style={styles.booksGrid}>
              {filteredBooks.map((book) => {
                const isHovered = hoveredBook === book.id;
                return (
                  <div 
                    key={book.id} 
                    style={{
                      ...styles.bookCard,
                      ...(isHovered ? styles.bookCardHover : {})
                    }}
                    onClick={() => handleBookClick(book)}
                    onMouseEnter={() => setHoveredBook(book.id)}
                    onMouseLeave={() => setHoveredBook(null)}
                  >
                    <div style={{
                      ...styles.bookCover,
                      background: book.color
                    }}>
                      <BookOpen size={48} color="white" />
                    </div>
                    <div style={styles.bookInfo}>
                      <div style={styles.bookTitle}>{book.title}</div>
                      <div style={styles.bookAuthor}>{book.author}</div>
                      <span style={getStatusStyle(book.status)}>
                        {getStatusText(book.status)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );

      case 'members':
        return (
          <>
            <h1 style={styles.pageTitle}>Quản lý thành viên</h1>
            {searchTerm && (
              <div style={{ marginBottom: '24px', fontSize: '16px', color: '#6b7280' }}>
                Kết quả tìm kiếm: "{searchTerm}" ({filteredMembers.length} kết quả)
              </div>
            )}
            <div style={styles.membersTable}>
              <div style={styles.tableHeader}>
                <div>Avatar</div>
                <div>Họ tên</div>
                <div>Email</div>
                <div>Số điện thoại</div>
                <div>Vai trò</div>
                <div>Thao tác</div>
              </div>
              
              {filteredMembers.map(member => (
                <div key={member.id} style={styles.tableRow}>
                  <div style={styles.memberAvatar}>
                    {member.name.charAt(0)}
                  </div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>{member.name}</div>
                  <div style={{ color: '#6b7280' }}>{member.email}</div>
                  <div>{member.phone}</div>
                  <div>
                    <span style={getRoleStyle(member.role)}>
                      {getRoleText(member.role)}
                    </span>
                  </div>
                  <div>
                    {member.role === 'user' && (
                      <button
                        style={styles.actionButton}
                        onClick={() => handlePromoteMember(member)}
                      >
                        <UserCheck size={12} style={{ marginRight: '4px' }} />
                        Thăng cấp
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'notifications':
        return (
          <>
            <h1 style={styles.pageTitle}>Thông báo hệ thống</h1>
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6b7280',
              fontSize: '16px'
            }}>
              <Bell size={48} color="#d1d5db" />
              <div style={{ marginTop: '16px' }}>Chưa có thông báo nào</div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Crown size={20} />
            </div>
            <span>AdminPanel</span>
          </div>
          
          <nav style={styles.nav}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isHovered = hoveredNavItem === item.id;
              
              return (
                <div
                  key={item.id}
                  style={{
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {}),
                    ...(isHovered && !isActive ? styles.navItemHover : {})
                  }}
                  onClick={() => setActiveTab(item.id)}
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div style={styles.logoutContainer}>
            <button
              style={{
                ...styles.logoutButton,
                ...(hoveredLogout ? styles.logoutButtonHover : {})
              }}
              onClick={handleLogout}
              onMouseEnter={() => setHoveredLogout(true)}
              onMouseLeave={() => setHoveredLogout(false)}
            >
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.main}>
          {/* Header */}
          <header style={styles.header}>
            <div style={styles.searchContainer}>
              <Search size={20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Tìm kiếm sách, thành viên..."
                style={styles.searchBar}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button style={styles.searchButton}>
                <Search size={16} />
              </button>
            </div>
            
            <div style={styles.userProfile}>
              <div style={styles.avatar}>AD</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Admin</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Quản trị viên</div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main style={styles.content}>
            {renderContent()}
          </main>
        </div>

        {/* Promote Member Modal */}
        {showPromoteModal && selectedMember && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <div style={styles.modalTitle}>Xác nhận thăng cấp</div>
              <div style={styles.modalText}>
                Bạn có chắc chắn muốn thăng cấp <strong>{selectedMember.name}</strong> từ 
                <strong> Thành viên</strong> lên <strong> Thủ thư</strong> không?
              </div>
              <div style={styles.modalText}>
                Sau khi thăng cấp, {selectedMember.name} sẽ có quyền quản lý sách và thành viên khác.
              </div>
              <div style={styles.modalButtons}>
                <button style={styles.cancelButton} onClick={cancelPromote}>
                  Hủy
                </button>
                <button style={styles.confirmButton} onClick={confirmPromote}>
                  Xác nhận thăng cấp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLibrary;