import type { FC } from 'react';
import { IoSend, IoMic, IoImage, IoAttach, IoClose, IoArrowUp } from 'react-icons/io5';
import { FiPaperclip } from 'react-icons/fi';

interface IconProps {
  size?: number;
  className?: string;
}

export const SendIcon: FC<IconProps> = ({ size = 24, className, ...props }) => <IoSend size={size} className={className} {...props} />;

export const ArrowUpIcon: FC<IconProps> = ({ size = 24, className, ...props }) => <IoArrowUp size={size} className={className} {...props} />;

export const MicrophoneIcon: FC<IconProps> = ({ size = 24, className, ...props }) => <IoMic size={size} className={className} {...props} />;

export const ImageIcon: FC<IconProps> = ({ size = 24, className, ...props }) => <IoImage size={size} className={className} {...props} />;

export const AttachmentIcon: FC<IconProps> = ({ size = 24, className, ...props }) => <IoAttach size={size} className={className} {...props} />;

export const CloseIcon: FC<IconProps> = ({ size = 20, className, ...props }) => <IoClose size={size} className={className} {...props} />;

export const PaperclipIcon: FC<IconProps> = ({ size = 20, className, ...props }) => <FiPaperclip size={size} className={className} {...props} />;
