```mermaid
flowchart TD
    A[User] --> B[Login / Signup]
    B --> C{Choose Travel Action}
    C --> D[Book Ticket]
    C --> E[Search Destination]
    C --> F[View Bookings]

    D --> G[Payment Gateway]
    G --> H[Booking Confirmed]

    E --> I[Show Results]

    F --> J[Database]

    J --> A
```
