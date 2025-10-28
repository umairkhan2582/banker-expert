import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function WalletButton() {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (wallet.status === 'disconnected' || wallet.status === 'error') {
    return (
      <Button
        onClick={connectWallet}
        variant="outline"
        className="gap-2"
        data-testid="button-connect-wallet"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  if (wallet.status === 'connecting') {
    return (
      <Button variant="outline" disabled data-testid="button-connecting-wallet">
        <Wallet className="h-4 w-4 animate-pulse" />
        Connecting...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 font-mono"
          data-testid="button-wallet-connected"
        >
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          {truncateAddress(wallet.address!)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Network</span>
            <Badge variant="secondary" className="text-xs">
              {wallet.network}
            </Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="text-sm font-medium">{wallet.balance} ETH</span>
          </div>
          <div className="flex items-center justify-between mb-3 pb-3 border-b">
            <span className="text-sm text-muted-foreground">Address</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-sm hover:text-foreground transition-colors"
              data-testid="button-copy-address"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
        <DropdownMenuItem
          onClick={disconnectWallet}
          className="text-destructive cursor-pointer"
          data-testid="button-disconnect-wallet"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
