import React from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import { useAppTheme } from '../theme/appTheme';

const LOGO_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/e92944fb26febc6d339e47de35b602261d131016.png';

const socialIcons = [
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_968.png',
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_971.png',
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_974.png',
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_977.png',
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_981.png',
];

function FooterColumn({title, items}: {title: string; items: string[]}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.column}>
      <Text style={[styles.columnTitle, {color: colors.footerText}]}>{title}</Text>
      <View style={styles.columnList}>
        {items.map(item => (
          <Text key={item} style={[styles.columnItem, {color: colors.footerText}]}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function Footer() {
  const {width} = useWindowDimensions();
  const { colors } = useAppTheme();
  const isMd = width >= 768;
  const isLg = width >= 1024;
  const brandWidth = isLg ? '30%' : isMd ? '48%' : '100%';
  const columnWidth = isLg ? '18%' : isMd ? '48%' : '100%';

  return (
    <View style={[styles.footer, {backgroundColor: colors.footerBackground}]}>
      <View style={styles.inner}>
        <View style={styles.grid}>
          <View style={[styles.brandColumn, {width: brandWidth}]}>
            <View
              style={[
                styles.brandCard,
                {backgroundColor: colors.footerSurface, borderColor: colors.footerSurface},
              ]}>
              <Image source={{uri: LOGO_URI}} style={styles.logo} resizeMode="contain" />
              <Text style={[styles.brandTagline, {color: colors.footerTextMuted}]}>
                #1 Platform For Saudi Jobs
              </Text>
            </View>

            <View style={styles.socialRow}>
              {socialIcons.map(icon => (
                <Image key={icon} source={{uri: icon}} style={styles.socialIcon} resizeMode="contain" />
              ))}
            </View>
          </View>

          <View style={{width: columnWidth}}>
            <FooterColumn title="Company" items={['About Us', 'Contact Us']} />
          </View>
          <View style={{width: columnWidth}}>
            <FooterColumn title="Legal" items={['Privacy Policy', 'Terms & Conditions']} />
          </View>
          <View style={{width: columnWidth}}>
            <FooterColumn title="Resources" items={['Blog']} />
          </View>
        </View>

        <View style={[styles.copyrightWrap, {borderTopColor: colors.footerBorder}]}>
          <Text style={[styles.copyrightText, {color: colors.footerTextSoft}]}>
            Copyright© 2025 Bhc Jobs Ltd - All Rights Reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  inner: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 32,
  },
  brandColumn: {
    rowGap: 24,
  },
  brandCard: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#ffffff',
    padding: 4,
  },
  logo: {
    width: 121,
    height: 24,
  },
  brandTagline: {
    marginTop: 4,
    color: '#374151',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
    rowGap: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  column: {
    rowGap: 16,
  },
  columnTitle: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  columnList: {
    rowGap: 8,
  },
  columnItem: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
  },
  copyrightWrap: {
    marginTop: 48,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#60a5fa',
    alignItems: 'center',
  },
  copyrightText: {
    textAlign: 'center',
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 20,
  },
});
