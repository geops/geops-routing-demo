import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@mui/material';
import Mail from '@mui/icons-material/Mail';

function JiraMailLink({
  mot,
  via,
  expectedVias,
  expectedLevels,
  generalizationGraph,
  minKm,
  maxKm,
}) {
  const mailUrl = useMemo(() => {
    const subject = encodeURIComponent(`Routing issue - ${mot}`);

    const indent = '\u00A0\u00A0\u00A0';

    const bodyLines = [
      '[Please add some description of the bug and what is expected. If possible add screenshots and drwaings of the expected paths or add images of the situaiton in the real world.]',
      '',
      '-----',
      `${mot}-xx:`,
      `${indent}description: Fill out`,
      `${indent}mot: ${mot}`,
      `${indent}via: ${via}`,
    ];

    if (expectedVias?.length) {
      bodyLines.push(`${indent}expect_via:`);
      expectedVias.forEach((v) => {
        bodyLines.push(`${indent}${indent}- ${v}`);
      });
    }

    if (expectedLevels?.length) {
      bodyLines.push(`${indent}expect_levels:`);
      expectedLevels.forEach((l) => {
        bodyLines.push(`${indent}${indent}- ${l}`);
      });
    }

    if (generalizationGraph) {
      bodyLines.push(`${indent}graph: ${generalizationGraph}`);
    }

    bodyLines.push(
      `${indent}min_km: ${minKm}`,
      `${indent}max_km: ${maxKm}`,
      '-----',
    );

    const body = encodeURIComponent(bodyLines.join('\r\n'));

    return `mailto:routing-issue@geops.ch?subject=${subject}&body=${body}`;
  }, [
    mot,
    expectedVias,
    expectedLevels,
    generalizationGraph,
    minKm,
    maxKm,
    via,
  ]);

  return (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <Tooltip
        title="Report this case by email to the geOps team"
        placement="bottom"
      >
        <Button
          component="a"
          href={mailUrl}
          rel="noopener noreferrer"
          target="_blank"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
          }}
        >
          <Mail fontSize="small" />
          Report issue
        </Button>
      </Tooltip>
    </div>
  );
}

JiraMailLink.propTypes = {
  mot: PropTypes.string.isRequired,
  via: PropTypes.string.isRequired,
  expectedVias: PropTypes.arrayOf(PropTypes.string),
  expectedLevels: PropTypes.arrayOf(PropTypes.string),
  generalizationGraph: PropTypes.string,
  minKm: PropTypes.string.isRequired,
  maxKm: PropTypes.string.isRequired,
};

export default JiraMailLink;
