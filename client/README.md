```
📂 client  # (Main Frontend Folder)
│── 📂 public                 # Static assets (favicon, logos, etc.)
│── 📂 src
│   │── 📂 api                 # API service functions (Matches backend routes)
│   │   ├── authApi.ts         # Matches authRoutes.js
│   │   ├── projectApi.ts      # Matches projectRoutes.js
│   │   ├── taskApi.ts         # Matches taskRoutes.js
│   │   ├── commentApi.ts      # Matches commentRoutes.js
│   │   ├── notificationApi.ts # Matches notificationRoutes.js
│   │   ├── integrationApi.ts  # Matches integrationRoutes.js
│   │── 📂 components          # Reusable UI components
│   │   ├── ui                 # Generic UI components (Buttons, Inputs, Modals)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loader.tsx
│   │   ├── layout             # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   ├── project            # Project-related UI components
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectList.tsx
│   │   ├── task               # Task-related UI components
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskList.tsx
│   │   ├── comment            # Comment-related UI components
│   │   │   ├── CommentCard.tsx
│   │   │   ├── CommentList.tsx
│   │   ├── notification       # Notification-related UI components
│   │   │   ├── NotificationCard.tsx
│   │   │   ├── NotificationList.tsx
│   │── 📂 features            # Redux slices (Matches backend models)
│   │   ├── authSlice.ts       # Matches userModel.js
│   │   ├── projectSlice.ts    # Matches projectModel.js
│   │   ├── taskSlice.ts       # Matches taskModel.js
│   │   ├── commentSlice.ts    # Matches commentModel.js
│   │   ├── notificationSlice.ts # Matches notificationModel.js
│   │   ├── integrationSlice.ts  # Matches integrationModel.js
│   │── 📂 hooks               # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useProject.ts
│   │   ├── useTasks.ts
│   │   ├── useComments.ts
│   │   ├── useNotifications.ts
│   │── 📂 layouts             # Page layouts
│   │   ├── DashboardLayout.tsx
│   │   ├── AuthLayout.tsx
│   │── 📂 pages               # Pages (Match backend logic)
│   │   ├── Auth.tsx           # Login / Register (Matches authController.js)
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── Project.tsx        # Matches projectController.js
│   │   ├── Task.tsx           # Matches taskController.js
│   │   ├── Comments.tsx       # Matches commentController.js
│   │   ├── Notifications.tsx  # Matches notificationController.js
│   │   ├── Integrations.tsx   # Matches integrationController.js
│   │── 📂 routes              # Routing configuration
│   │   ├── index.tsx
│   │── 📂 store               # Redux store setup
│   │   ├── store.ts
│   │── 📂 styles              # Global styles & Tailwind configs
│   │   ├── globals.css
│   │── 📂 utils               # Utility functions/helpers
│   │   ├── formatDate.ts
│   │   ├── constants.ts
│   │── main.tsx               # Entry point
│   │── App.tsx                # Main component
│── tailwind.config.ts         # Tailwind CSS config
│── tsconfig.json              # TypeScript config
│── package.json               # Dependencies
```
