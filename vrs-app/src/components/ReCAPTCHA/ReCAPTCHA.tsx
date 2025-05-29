'use client';

import React, { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaProps {
    onChange: (token: string | null) => void;
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

const RecaptchaComponent: React.FC<RecaptchaProps> = ({ onChange }) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useEffect(() => {
        return () => {
            recaptchaRef.current?.reset();
        };
    }, []);

    return (
        <div style={{ margin: '1rem 0' }}>
            <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onChange}
                ref={recaptchaRef}
            />
        </div>
    );
};

export default RecaptchaComponent;
