import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostCard from "./PostCard";

const mockPost = {
  id: 1,
  title: "Hello World",
  content: "This is the content",
  authorId: "user_123",
  authorName: "johndoe",
  createdAt: new Date().toISOString(),
};

const mockHandlers = {
  onDelete: jest.fn().mockResolvedValue(undefined),
  onEdit: jest.fn().mockResolvedValue(undefined),
};

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("PostCard", () => {
  it("renders post title in the header", () => {
    render(<PostCard post={mockPost} currentUserId="other_user" {...mockHandlers} />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders author name prefixed with @", () => {
    render(<PostCard post={mockPost} currentUserId="other_user" {...mockHandlers} />);
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
  });

  it("renders post content", () => {
    render(<PostCard post={mockPost} currentUserId="other_user" {...mockHandlers} />);
    expect(screen.getByText("This is the content")).toBeInTheDocument();
  });

  it("does NOT show edit/delete icons when user is not the owner", () => {
    render(<PostCard post={mockPost} currentUserId="other_user" {...mockHandlers} />);
    expect(screen.queryByAltText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Delete")).not.toBeInTheDocument();
  });

  it("shows edit/delete icons when user is the owner", () => {
    render(<PostCard post={mockPost} currentUserId="user_123" {...mockHandlers} />);
    expect(screen.getByAltText("Edit")).toBeInTheDocument();
    expect(screen.getByAltText("Delete")).toBeInTheDocument();
  });

  it("opens delete confirmation modal when delete icon is clicked", async () => {
    render(<PostCard post={mockPost} currentUserId="user_123" {...mockHandlers} />);
    await userEvent.click(screen.getByAltText("Delete"));
    expect(screen.getByText("Are you sure you want to delete this item?")).toBeInTheDocument();
  });

  it("opens edit modal when edit icon is clicked", async () => {
    render(<PostCard post={mockPost} currentUserId="user_123" {...mockHandlers} />);
    await userEvent.click(screen.getByAltText("Edit"));
    expect(screen.getByText("What's on your mind?")).toBeInTheDocument();
  });
});
