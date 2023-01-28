import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const ExerciseProse = ({
  markdownElement,
  children,
}: PropsWithChildren<{
  markdownElement: JSX.Element;
}>) => {
  return (
    <div className="exercise">
      <Prose>{markdownElement}</Prose>
      <div className="code">{children}</div>
    </div>
  );
};

const key = 'prose-is-open-exercise';

const Prose = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = React.useState(() => {
    try {
      return localStorage.getItem(key) === 'true';
    } catch (e) {
      return false;
    }
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const { current } = ref;
    if (!current) return;

    const codeElements = Array.from(current.querySelectorAll('code'));

    for (const code of codeElements) {
      const textContent = code.textContent;
      if (!textContent) continue;

      code.textContent = textContent
        .replaceAll('&gt;', '>')
        .replaceAll('&apos;', "'")
        .replaceAll('&quot;', '"')
        .replaceAll('&lt;', '<')
        .replaceAll('&amp;', '&')
        .replaceAll('&#xE9;', 'é')
        .replaceAll('&#xE8;', 'è')
        .replaceAll('&#xE0;', 'à')
        .replaceAll('&#xE2;', 'â')
        .replaceAll('&#xE7;', 'ç')
        .replaceAll('&#xE9;', 'é')
        .replaceAll('&#xE8;', 'è')
        .replaceAll('&#xE0;', 'à')
        .replaceAll('&#xE2;', 'â')
        .replaceAll('&#xE7;', 'ç');
    }

    const imgElements = Array.from(current.querySelectorAll('img'));
    for (const img of imgElements) {
      const src = img.getAttribute('src');
      if (!src) continue;
      if (src.startsWith('../../../public/')) {
        img.setAttribute('src', src.replace('../../../public/', '/'));
      }
    }

    const h2Elements = Array.from(current.querySelectorAll('h2'));

    Array.from(current.querySelectorAll('[solution-link]')).map((el) => el.remove());

    for (const h2 of h2Elements) {
      if (!h2.textContent) continue;
      const exerciseNo = h2.textContent.match(/\d+/)?.[0] ?? 1;

      const link = document.createElement('a');
      const currentUrl = window.location.pathname.split('/')[1];
      link.href = `/${currentUrl}/solution/${exerciseNo}`;
      link.textContent = `Solution ${exerciseNo}`;
      link.setAttribute('solution-link', 'true');

      current.children[0].insertBefore(link, h2.nextSibling);
    }
  }, [isOpen, children]);

  const handleClick = () => {
    setIsOpen((p) => {
      localStorage.setItem(key, String(!p));
      return !p;
    });
  };

  const pathname = window.location.pathname.split('/').slice(0, -1);
  const backUrl = window.location.origin + pathname.join('/');

  return (
    <>
      <button className="absolute-open-button" onClick={() => handleClick()}>
        {isOpen ? 'Close' : 'Open md'}
      </button>
      <Link
        to={backUrl}
        relative="path"
        className="absolute-open-button"
        style={{ top: 46 }}
      >
        Back
      </Link>
      {isOpen ? (
        <div ref={ref} className="prose">
          {children}
        </div>
      ) : null}
    </>
  );
};
