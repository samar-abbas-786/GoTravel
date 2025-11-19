flowchart TD

%% ========== START ==========
A[User Visits Website] --> B{Is User Logged In?<br/>(Check token cookie)}

%% ========== LOGIN CHECK ==========
B -->|No Token| L[Redirect to /login]
B -->|Token Exists| M{Is Token Valid?<br/>JWT Verify}

M -->|Invalid| L
M -->|Valid| H[Access Allowed → Homepage / Dashboard]

%% ========== AUTH ROUTES ==========
subgraph Authentication
  subgraph Signup Flow
    S1[User → POST /api/auth/signup<br/>name, email, password] --> S2{Does Email Exist?}
    S2 -->|Yes| S3[Return Error: User Exists]
    S2 -->|No| S4[Hash Password (bcrypt)]
    S4 --> S5[Create User in MongoDB]
    S5 --> S6[Return Signup Success]
  end

  subgraph Login Flow
    L1[User → POST /api/auth/login<br/>email, password] --> L2{User Found in DB?}
    L2 -->|No| L3[Return Error: User Not Found]
    L2 -->|Yes| L4[Compare Password (bcrypt.compare)]
    L4 -->|Mismatch| L5[Return Error: Incorrect Password]
    L4 -->|Match| L6[Generate JWT (7 days expiry)]
    L6 --> L7[Set Token in HTTP-only Cookie]
    L7 --> L8[Return Login Success]
  end
end

%% ========== MIDDLEWARE ==========
subgraph Middleware (Next.js)
  MW1[Request to Protected Route<br/>/history or /travel/*] --> MW2[Read token cookie]
  MW2 --> MW3{Verify JWT}
  MW3 -->|Valid| MW4[Allow Request → NextResponse.next()]
  MW3 -->|Invalid / Missing| MW5[Redirect to /login]
end

%% ========== TRIP GENERATION ==========
H --> T1[User Inputs Source, Destination, Budget<br/>→ POST /api/generateTrip]

subgraph Gemini API Flow
  T1 --> T2[Send Data to Gemini API<br/>(@google/generative-ai)]
  T2 --> T3[Gemini Returns Multiple Trip Plans<br/>(stays, travel modes, places, expenses)]
end

T3 --> T4[Display Plans to User]
T4 --> T5[User Selects Best Plan]

%% ========== SAVE PLAN ==========
T5 --> SP1[POST /api/saveTrip<br/>Save Selected Plan]
SP1 --> SP2[Insert Plan into MongoDB]
SP2 --> SP3[Return Success: Plan Saved]

%% ========== VIEW SAVED PLANS ==========
H --> VS1[User Visits /history]
VS1 --> MW1
MW4 --> VS2[Fetch Saved Plans from MongoDB]
VS2 --> VS3[Display Saved Trips]

%% ========== END ==========
VS3 --> Z[End]
