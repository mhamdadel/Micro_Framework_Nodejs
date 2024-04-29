import AppTerms from '@/Utilts/LanguageTerms/appTerms';
import rateLimit from 'express-rate-limit';

// limit requests per hour
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10000,
    message: AppTerms.TO_MANY_REQUESTS_FROM_THIS_IP_TRY_AGAIN_AFTER_HOUR,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
module.exports = {
    limiter,
};