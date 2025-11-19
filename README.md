flowchart TD
  %% Client / Browser (React / Next app)
  subgraph CLIENT["Client (Next.js App - React / TS)"]
    direction TB
    C_Home["Home (app/page.tsx)"]
    C_Login["Login Page<br/>(app/login/page.tsx)"]
    C_Signup["Signup Page<br/>(app/Signup/page.tsx)"]
    C_TravelForm["Travel Search Page<br/>(app/travel/page.tsx)"]
    C_TravelShow["Travel Results Page<br/>(app/travel/show/page.tsx)"]
    C_History["History Page<br/>(/history)"]
    C_AuthContext["AuthProvider / AuthContext<br/>(context/authContext.tsx)"]
    C_LocalStorage["localStorage (user, travel_data)"]
    C_Axios["API Layer (axios)"]
  end

  %% Server (Next API routes + middleware)
  subgraph SERVER["Server (Next.js app router API)"]
    direction TB
    S_Middleware["middleware.ts<br/>Matches: /history, /travel/:path*<br/>Reads cookie 'token' and jwtVerify via jose"]
    S_API_Login["POST /api/login<br/>(app/api/login/route.ts)"]
    S_API_Signup["POST /api/signup<br/>(app/api/signup/route.ts)"]
    S_API_AI["POST /api/ai<br/>(app/api/ai/route.ts)"]
    S_API_History["GET /api/history (or /history page data)"]
    S_DB["Database (users, history)"]
    S_Gemini["Google Generative AI (Gemini API)"]
    S_JWT["JWT secret (process.env.JWT_SECRET_KEY)"]
  end

  %% Client startup and context
  C_Home --> C_AuthContext
  C_AuthContext -->|on mount: read localStorage.user| C_LocalStorage
  C_LocalStorage --> C_AuthContext

  %% Signup flow
  C_Signup -->|POST /api/signup {name,email,password}| C_Axios
  C_Axios --> S_API_Signup
  S_API_Signup -->|validate, hash pw, create user| S_DB
  S_API_Signup -->|response 201 + user (may set cookie)| C_Axios
  C_Axios -->|store user| C_LocalStorage
  C_LocalStorage --> C_AuthContext
  C_AuthContext -->|redirect| C_Login

  %% Login flow (server sets cookie 'token')
  C_Login -->|POST /api/login {email,password}| C_Axios
  C_Axios --> S_API_Login
  S_API_Login -->|find user, bcrypt.compare| S_DB
  S_API_Login -->|if ok: jwt.sign({id}) expiresIn:7d| S_JWT
  S_API_Login -->|set cookie 'token' httpOnly, path=/, maxAge:7d| C_Axios
  S_API_Login -->|return 200 + user (body)| C_Axios
  C_Axios -->|localStorage.setItem('user', user)| C_LocalStorage
  C_LocalStorage --> C_AuthContext
  C_AuthContext -->|client redirect| C_TravelForm

  %% Protected route middleware (server-side)
  C_TravelForm -->|POST /api/ai {source,destination,budget}| C_Axios
  C_Axios --> S_API_AI
  S_Middleware -.->|applies to /travel/:path* and /history| S_API_AI
  S_Middleware -->|reads cookie 'token'| S_JWT
  S_JWT -->|jwtVerify(token, secret)| S_Middleware
  S_Middleware -->|if invalid or missing -> redirect /login (NextResponse.redirect)| C_Login

  %% AI search flow (protected by middleware)
  S_API_AI -->|validate body fields (source,destination,budget)| S_API_AI
  S_API_AI -->|construct prompt + call Gemini| S_Gemini
  S_Gemini -->|returns text| S_API_AI
  S_API_AI -->|strip markdown, parse JSON -> if parse error -> 500| C_Axios
  S_API_AI -->|200 { travel: parsed }| C_Axios
  C_Axios -->|localStorage.setItem('travel_data', travel)| C_LocalStorage
  C_LocalStorage --> C_TravelShow
  C_TravelShow -->|reads localStorage.travel_data on mount| C_LocalStorage

  %% History (protected)
  C_History -->|GET /history| C_Axios
  C_Axios --> S_API_History
  S_Middleware --> S_API_History
  S_API_History -->|query S_DB for user's saved searches| S_DB
  S_DB -->|return saved searches| S_API_History
  S_API_History -->|200 + history| C_Axios
  C_Axios --> C_History

  %% Error & redirect flows
  S_JWT -.->|missing/invalid| S_Middleware
  S_Middleware -->|redirect to /login| C_Login
  S_API_AI -.->|AI parse failure| C_Axios
  C_Axios -->|client: show error toast / keep user on TravelForm| C_TravelForm

  style CLIENT fill:#f7fff7,stroke:#2f855a
  style SERVER fill:#f0f9ff,stroke:#2b6cb0
