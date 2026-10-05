import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Compass, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred while loading this page.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Page Not Found';
      message = "We couldn't find the coastal condo or page you were looking for.";
    } else {
      title = `${error.status} Error`;
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-sand-200/80 flex items-center justify-center text-tide-900 mb-6 shadow-sm">
        <Compass className="w-8 h-8 text-seaglass-600 animate-pulse" />
      </div>

      <span className="text-xs font-mono tracking-wider uppercase text-brass-700 font-semibold mb-2">
        RentABeachCondo.com
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl text-tide-900 mb-4 max-w-lg">
        {title}
      </h1>

      <p className="text-ink-600 text-sm max-w-md mb-8 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={() => window.location.reload()}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Reload Page
        </Button>
        <Link to="/">
          <Button
            variant="secondary"
            size="md"
            icon={<Home className="w-4 h-4" />}
          >
            Return to Home
          </Button>
        </Link>
      </div>

      {import.meta.env.DEV && error instanceof Error && (
        <pre className="mt-8 p-4 bg-ink-950 text-sand-200 text-xs text-left max-w-2xl overflow-auto rounded-lg font-mono">
          {error.stack}
        </pre>
      )}
    </div>
  );
};
