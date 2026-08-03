import Mail from '@mui/icons-material/Mail';
import { Button, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

function JiraMailLink({
  barrierFree,
  expectedLevels,
  expectedVias,
  generalizationGraph,
  levels,
  maxKm,
  maxViaDistance,
  minKm,
  mot,
  via,
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
      `${indent}via: '${via}'`,
    ];

    if (barrierFree) {
      bodyLines.push(`${indent}barrierefrei: true`);
    }

    if (levels) {
      bodyLines.push(`${indent}levels: '${levels}'`);
    }

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

    if (maxViaDistance) {
      bodyLines.push(`${indent}max_via_distance: ${maxViaDistance}`);
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
    levels,
    expectedVias,
    expectedLevels,
    generalizationGraph,
    minKm,
    maxKm,
    via,
    barrierFree,
    maxViaDistance,
  ]);

  return (
    <Tooltip
      placement="bottom"
      title="Report this case by email to the geOps team"
    >
      <Button
        component="a"
        href={mailUrl}
        rel="noopener noreferrer"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          gap: 0.6,
        }}
        target="_blank"
      >
        <Mail fontSize="small" />
        Report issue
      </Button>
    </Tooltip>
  );
}

JiraMailLink.propTypes = {
  barrierFree: PropTypes.bool,
  expectedLevels: PropTypes.arrayOf(PropTypes.string),
  expectedVias: PropTypes.arrayOf(PropTypes.string),
  generalizationGraph: PropTypes.string,
  levels: PropTypes.string,
  maxKm: PropTypes.string.isRequired,
  maxViaDistance: PropTypes.string,
  minKm: PropTypes.string.isRequired,
  mot: PropTypes.string.isRequired,
  via: PropTypes.string.isRequired,
};

export default JiraMailLink;
