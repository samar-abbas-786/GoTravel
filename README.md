flowchart TB

%% ===========================
%% MAIN SECTIONS
%% ===========================
subgraph CLIENT["Client (React/Next.js, TypeScript)"]
direction TB
C_Pages["Pages: Home, Login, Signup, TravelSearch, History, Profile"]
C_AuthContext["AuthContext (stores accessToken in memory)"]
C_API["API Layer (fetch/axios wrapper)"]
C_Access["Access Token (Memory only)"]
C_Refresh["Refresh Token (HttpOnly Cookie — set by server)"]
end

subgraph SERVER["Server (Node.js / Express / Next API Routes)"]
direction TB
S_Auth["Auth Controller (/auth/signup, /auth/login, /auth/refresh, /auth/logout)"]
S_AI["AI Controller (/ai/search)"]
S_History["History Controller (/history)"]
S_Middleware["Auth Middleware (verify access token from Authorization header)"]
S_Token["Token Service (sign/verify access & refresh tokens)"]
S_DB["Database (users, search_history)"]
S_AI_Service["AI Service (Gemini / External AI API)"]
end

%% ===========================
%% AUTH FLOWS
%% ===========================

%% SIGNUP
C_Pages -->|Submit Signup Form| C_API
C_API -->|POST /auth/signup| S_Auth
S_Auth -->|Validate + Hash Password| S_DB
S_Auth -->|Sign access & refresh tokens| S_Token
S_Auth -->|Set HttpOnly Refresh Cookie + Return accessToken| C_API
C_API -->|Store accessToken in memory| C_AuthContext
C_AuthContext -->|Navigate| C_Pages

%% LOGIN
C_Pages -->|Submit Login Form| C_API
C_API -->|POST /auth/login| S_Auth
S_Auth -->|Verify Password| S_DB
S_Auth -->|Generate Tokens| S_Token
S_Auth -->|Set HttpOnly Refresh Cookie + Return accessToken| C_API
C_API -->|Store accessToken in memory| C_AuthContext

%% TOKEN REFRESH
C_API -->|401 Detected| C_AuthContext
C_AuthContext -->|POST /auth/refresh (cookie sent automatically)| S_Auth
S_Auth -->|Validate Refresh Token| S_Token
S_Auth -->|Rotate Token + Return New AccessToken| C_API
C_API -->|Update accessToken in memory| C_AuthContext
C_AuthContext -->|Retry failed request| C_API

%% LOGOUT
C_Pages -->|Logout button| C_API
C_API -->|POST /auth/logout| S_Auth
S_Auth -->|Invalidate refresh token + Clear cookie| S_Token
C_AuthContext -->|Clear accessToken| C_Pages

%% ===========================
%% PROTECTED ROUTES
%% ===========================

%% TRAVEL SEARCH
C_Pages -->|Open /travel| C_AuthContext
C_AuthContext -->|Check accessToken| C_Pages
C_Pages -->|POST /ai/search with Authorization: Bearer token| C_API
C_API --> S_Middleware
S_Middleware -->|Verify accessToken| S_Token
S_Middleware -->|If valid| S_AI
S_AI -->|Call AI Service| S_AI_Service
S_AI_Service -->|AI Suggestions| S_AI
S_AI -->|Save to History| S_DB
S_AI -->|Return Suggestions| C_API
C_API -->|Display Results| C_Pages

%% HISTORY
C_Pages -->|GET /history (Bearer token)| C_API
C_API --> S_Middleware
S_Middleware -->|Verify accessToken| S_Token
S_Middleware --> S_History
S_History -->|Fetch user history| S_DB
S_History -->|Return history[]| C_API
C_API --> C_Pages

%% ===========================
%% ERROR & SECURITY FLOWS
%% ===========================
S_Middleware -.->|Invalid/Expired Access Token| C_API
C_API -.->|Trigger refresh flow| C_AuthContext
S_Auth -.->|Invalid Refresh Token| C_API
C_API -.->|Force Logout| C_Pages

%% STYLING
classDef client fill:#e6fffa,stroke:#1d7874,stroke-width:1px;
classDef server fill:#eef2ff,stroke:#4338ca,stroke-width:1px;

class CLIENT client
class SERVER server
