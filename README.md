# Review Management Platform

## Overview

The Review Management Platform helps businesses efficiently manage and respond to customer reviews from a centralized interface. It integrates with the Google My Business API and uses Auth0 for secure authentication, offering a streamlined and user-friendly experience.

## Features

- **Review Display:** Shows customer reviews with star ratings, profile pictures, and review text.
- **Reply Functionality:** Allows businesses to reply to reviews directly from the platform.
- **Pagination:** Efficiently handles multiple reviews.
- **User Authentication:** Secures access using Auth0.

## Technology Stack

- **Frontend:** React.js
- **Backend:** Flask
- **Database:** SQLAlchemy
- **APIs:**
  - Google My Business API
  - Auth0 for authentication
- **Version Control:** Git

## System Architecture

1. **Frontend:** Manages the user interface and communicates with the backend via API calls.
2. **Backend:** Processes requests, interacts with the database, and handles API integrations.
3. **Database:** Stores review and reply data.
4. **External APIs:** Used for authentication and fetching reviews.

## Installation

### Environment Setup

**Frontend:**

```bash
# Install Node.js and npm
npm install
**Backend:**
# Install Python and Flask
pip install -r requirements.txt
