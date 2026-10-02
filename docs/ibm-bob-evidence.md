# IBM Bob measured outcomes

## RevTech ROI

- Adam McDaniel, “Measuring the ROI of AI-assisted development, and how IBM did it,” IBM Think, 2026
- https://www.ibm.com/think/perspectives/measuring-roi-ai-assisted-development-how-ibm-did-it
- IBM matched the same developers and repositories across two 12-week periods and used pull requests as the governed measurement unit
- The estimate includes licensing, DevOps, support and operational maintenance costs
- The reported annual benefit was about ten times the annual Bob cost per developer, with avoided defect losses providing the largest contribution
- Evidence boundary: IBM internal program, matched pre/post analysis, no control group

## Blue Pearl

- IDC, “IBM Bob Advances IBM’s Position in Agentic SDLC Development,” 2026-05-01, available through IBM Bluemine under document `IA20260502000000060`
- IBM, “The new pace of modernization,” 2026
- https://www.ibm.com/case-studies/blue-pearl-bob
- IBM, “How Blue Pearl modernized an outdated codebase and resolved a risky security posture with IBM Bob,” 2026
- https://www.ibm.com/new/product-blog/how-blue-pearl-modernized-an-outdated-codebase-and-a-resolved-a-risky-security-posture-with-ibm-bob
- The public client case reports about 30 days reduced to 3 days, 160+ engineering hours preserved, 92% automated test coverage from a zero-test baseline and zero production incidents after deployment
- IDC repeats the 30-day to 3-day result and identifies Blue Pearl as an external customer, but describes the outcome as IBM-reported rather than independently reproduced
- Evidence boundary: early preview, results shared by the client, individual results vary

## Excluded alternatives

- IBM Payment Center Enterprise Payment Services is an IBM internal team and the article names no client, so its three-month testing metrics are not used on the slide
- The Japanese token-cost deck is a price scenario based on an assumed Bob rate of USD 1.25 per million tokens; public IBM pricing does not currently confirm that unit price, so it is retained only as a fallback
- Some IBM material describes a nine-month, 14-developer plan completed in three days, while the formal client case uses a roughly 30-day comparison baseline; the slide uses the more consistently documented 30-day to 3-day comparison

## ROI methodology figure

- Official article: https://www.ibm.com/think/perspectives/measuring-roi-ai-assisted-development-how-ibm-did-it
- Official Adobe asset title: `Methodology Figure for Cost ROI Bob Blog`
- Official source asset: `assets/revtech-roi-methodology-source.png` (720 x 405)
- Enhanced reference asset: `assets/revtech-roi-methodology-upscaled.png` (2880 x 1620, Lanczos resampling with light unsharp masking)
- The slide recreates the diagram with native HTML and CSS so its text and formula structure remain sharp at presentation scale
- The top-level structure is increased throughput value plus risk-avoidance value (labeled `Quality Savings` in the source diagram) minus Bob cost
- Throughput value covers feature, defect-fix and low-risk vulnerability remediation PR gains multiplied by the corresponding estimated planned effort and fully loaded labor rate
- Quality savings covers avoided production-defect losses and avoided high-risk vulnerability exposure
- Whole cost includes Bob licensing, ongoing DevOps and support activities, operational maintenance, development and SG&A estimates
- The estimated planned-effort factors in the green column are valuation inputs for additional capacity, rather than additional expenses caused by Bob
- The article reports an ROI of roughly ten times Bob's annual cost per developer, but does not disclose the complete arithmetic table needed to distinguish a standard net-ROI multiple from a gross benefit-cost multiple
