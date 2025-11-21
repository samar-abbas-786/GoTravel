```mermaid

flowchart TD

%% ============ USER ENTRY ============
A[User Opens Website] --> B{Authenticated?}

B -- No --> C[Redirect to Login Page]
C --> D[User Enters Email & Password]
D --> E[Check User in MongoDB]

E -- User Not Found --> E1[Return 'User does not exist']
E -- User Found --> F[Compare Password using bcrypt]

F -- Incorrect Password --> F1[Return 'Password Incorrect']
F -- Correct Password --> G[Generate JWT Token]

G --> H[Store JWT in HTTP-only Cookie]
H --> I[Redirect to Homepage]

B -- Yes --> I

%% ============ SIGNUP FLOW ============
C --> S1[Go to Signup Page]
S1 --> S2[User Enters Name, Email, Password]
S2 --> S3[Check if Email Already Exists]

S3 -- Exists --> S3a[Return 'User Already Exists']
S3 -- Not Exists --> S4[Hash Password using bcrypt]
S4 --> S5[Create User in MongoDB]
S5 --> S6[Return 'User Registered Successfully']
S6 --> C

%% ============ PROTECTED ROUTES ============
I --> M[User Requests Protected Route]
M --> M1[Next.js Middleware Reads Cookie]

M1 --> M2{Is Token Valid?}
M2 -- No --> M3[Redirect to Login]
M2 -- Yes --> M4[Allow Access to Route]

%% ============ TRIP GENERATION ============
M4 --> T1[User Inputs Source, Destination, Budget]
T1 --> T2[Backend Sends Data to Gemini API]

T2 --> T3[Gemini Returns Multiple Trip Plans]
T3 --> T4[Display Plans to User]

T4 --> T5[User Selects Best Plan]
T5 --> T6[Save Selected Plan in MongoDB]
T6 --> T7[Return Success]

%% ============ VIEW SAVED TRIPS ============
M4 --> V1[User Opens Saved Trips Page]
V1 --> V2[Fetch Saved Plans from MongoDB]
V2 --> V3[Display Saved Plans]
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel ##samar

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
