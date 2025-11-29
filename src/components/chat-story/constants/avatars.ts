import avatarIcon from '@/components/chat-story/assets/avatars/assistant.png';

export const AVATARS: Avatar[] = [
  { id: 'avatar1', icon: avatarIcon },
  { id: 'avatar2', icon: avatarIcon },
  { id: 'avatar3', icon: avatarIcon },
  { id: 'avatar4', icon: avatarIcon },
  { id: 'avatar5', icon: avatarIcon },
  { id: 'avatar6', icon: avatarIcon },
  { id: 'avatar7', icon: avatarIcon },
  { id: 'avatar8', icon: avatarIcon },
  { id: 'avatar9', icon: avatarIcon },
  { id: 'avatar10', icon: avatarIcon },
  { id: 'avatar11', icon: avatarIcon },
  { id: 'avatar12', icon: avatarIcon },
  { id: 'avatar13', icon: avatarIcon },
  { id: 'avatar14', icon: avatarIcon },
  { id: 'avatar15', icon: avatarIcon },
  { id: 'avatar16', icon: avatarIcon },
] as const;

interface IAvatar {
  id: string;
  icon: string;
}

export type Avatar = IAvatar | null;
