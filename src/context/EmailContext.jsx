import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

// Initial state with separate folders and an all array
const initialState = {
  inbox: {
    emails: [],
    selectedEmail: null,
    selectedEmails: [],
  },
  sent: {
    emails: [],
    selectedEmail: null,
    selectedEmails: [],
  },
  drafts: {
    emails: [],
    selectedEmail: null,
    selectedEmails: [],
  },
  starred: {
    emails: [],
    selectedEmail: null,
    selectedEmails: [],
  },
  trash: {
    emails: [],
    selectedEmail: null,
    selectedEmails: [],
  },
  all: {
    emails: [],
    selectedEmail: null,
    selectedEmails: [],
  },
  replyEmail: {
    email: null,
    mode: null,
  },
};

const emailReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_EMAIL": {
      console.log(action);
      return {
        ...state,
        [action.folder]: { ...state[action.folder], selectedEmail: action.id },
      };
    }

    case "SET_INBOX_EMAILS": {
      return {
        ...state,
        inbox: {
          ...state.inbox,
          emails: action.emails,
        },
      };
    }

    case "SET_SENT_EMAILS": {
      return {
        ...state,
        sent: {
          ...state.sent,
          emails: action.emails,
        },
      };
    }

    case "SET_DRAFTS_EMAILS": {
      const newState = {
        ...state,
        drafts: {
          ...state.drafts,
          emails: action.emails,
        },
      };
      return newState;
    }

    case "SET_STAR_EMAILS": {
      const newState = {
        ...state,
        starred: {
          ...state.starred,
          emails: action.emails,
        },
      };
      return newState;
    }

    case "SET_ALL_EMAILS": {
      return {
        ...state,
        all: {
          ...state.all,
          emails: action.emails,
        },
      };
    }

    case "REPLY_EMAIL": {
      const selectedEmail = state[action.folder].emails.find(
        (email) => email.id === state[action.folder].selectedEmail
      );
      console.log(selectedEmail);
      return {
        ...state,
        replyEmail: {
          email: selectedEmail,
          mode: action.mode,
        },
      };
    }

    case "SELECT_EMAIL_TRASH":
      return {
        ...state,
        [action.folder]: {
          ...state[action.folder],
          selectedEmail: state[action.folder].emails.find(
            (email) => email.id === action.id
          ),
        },
      };

    case "TOGGLE_STAR":
      return {
        ...state,
        [action.folder]: {
          ...state[action.folder],
          emails: state[action.folder].emails.map((email) =>
            email.id === action.id
              ? { ...email, starred: !email.starred }
              : email
          ),
        },
      };

    case "SELECT_EMAILS":
      return {
        ...state,
        [action.folder]: {
          ...state[action.folder],
          selectedEmails: action.selectedEmails,
        },
      };

    case "SET_TRASH_EMAILS": {
      return {
        ...state,
        trash: {
          ...state.trash,
          emails: action.emails,
        },
      };
    }

    case "DELETE_EMAILS":
      return {
        ...state,
        trash: {
          ...state.trash,
          emails: state.trash.emails.filter((email) => email.id !== action.id),
          selectedEmail: null, // Reset selectedEmail if it's deleted
        },
      };

    default:
      return state;
  }
};

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(emailReducer, initialState);

  return (
    <EmailContext.Provider value={{ state, dispatch }}>
      {children}
    </EmailContext.Provider>
  );
};

EmailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
