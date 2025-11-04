import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeRequest, betterlinks_nonce, prefix, plugin_root_url, is_pro_enabled } from '../../utils/helper';
import { useUpgradeProModal } from '../../utils/customHooks';
import UpgradeToPro from '../Teasers/UpgradeToPro';
import { urlGenerationTypes } from '../../utils/data';
import { fetch_links_data } from '../../redux/actions/links.actions';
import Select from 'react-select';

const ShortLinkGenerator = ({ settings, fetch_links_data }) => {
    // Pro modal state
    const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

    const [postTypes, setPostTypes] = useState([]);
    const [selectedPostType, setSelectedPostType] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [postLimit, setPostLimit] = useState('');
    const [sorting, setSorting] = useState('date_desc');
    const [includeExisting, setIncludeExisting] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [postCount, setPostCount] = useState(null);
    const [countLoading, setCountLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [generationInProgress, setGenerationInProgress] = useState(false);
    const [generationStatus, setGenerationStatus] = useState(null);
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);
    const [simulatedProgress, setSimulatedProgress] = useState(0);
    const [progressInterval, setProgressInterval] = useState(null);

    // Advanced filters
    const [descriptionLength, setDescriptionLength] = useState(150);
    const [redirectType, setRedirectType] = useState('301');
    const [customFieldKey, setCustomFieldKey] = useState('');
    const [manualPattern, setManualPattern] = useState('');
    const [customTags, setCustomTags] = useState([]);
    const [betterlinkCategories, setBetterlinkCategories] = useState([]);
    const [selectedBetterlinkCategory, setSelectedBetterlinkCategory] = useState(null);
    const [betterlinkTags, setBetterlinkTags] = useState([]);
    const [selectedBetterlinkTags, setSelectedBetterlinkTags] = useState([]);
    const [linkPrefix, setLinkPrefix] = useState(prefix || 'go');
    const [urlSlugGenerationType, setUrlSlugGenerationType] = useState(
        settings?.url_slug_generation_type ||
        (settings?.is_random_string ? 'random_string' : 'random_mixed')
    );

    // Sync URL slug generation type when settings change
    useEffect(() => {
        if (settings?.url_slug_generation_type) {
            setUrlSlugGenerationType(settings.url_slug_generation_type);
        } else if (settings?.is_random_string !== undefined) {
            setUrlSlugGenerationType(settings.is_random_string ? 'random_string' : 'random_mixed');
        }
    }, [settings?.url_slug_generation_type, settings?.is_random_string]);

    // Load post types on mount
    useEffect(() => {
        loadPostTypes();
        loadBetterlinkCategories();
        loadBetterlinkTags();

        // Cleanup on unmount
        return () => {
            clearProgressInterval();
        };
    }, []);

    // Update categories when post type changes
    useEffect(() => {
        if (selectedPostType) {
            const postTypeData = postTypes.find(pt => pt.name === selectedPostType.value);
            if (postTypeData) {
                const categoryOptions = [];
                Object.keys(postTypeData.categories).forEach(taxonomy => {
                    const taxData = postTypeData.categories[taxonomy];
                    taxData.terms.forEach(term => {
                        categoryOptions.push({
                            value: term.id,
                            label: `${term.name} (${taxData.label})`,
                            taxonomy: taxonomy
                        });
                    });
                });
                setCategories(categoryOptions);

                const tagOptions = [];
                Object.keys(postTypeData.tags).forEach(taxonomy => {
                    const taxData = postTypeData.tags[taxonomy];
                    taxData.terms.forEach(term => {
                        tagOptions.push({
                            value: term.id,
                            label: `${term.name} (${taxData.label})`,
                            taxonomy: taxonomy
                        });
                    });
                });
                setTags(tagOptions);
            }
        }
        setSelectedCategories([]);
        setSelectedTags([]);
    }, [selectedPostType, postTypes]);

    // Update post count when filters change
    useEffect(() => {
        if (selectedPostType) {
            updatePostCount();
        } else {
            setPostCount(null);
        }
    }, [selectedPostType, selectedCategories, selectedTags, includeExisting]);

    const loadPostTypes = async () => {
        setIsLoading(true);
        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_post_types_with_taxonomies',
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                setPostTypes(response.data.data);
            }
        } catch (error) {
            console.error('Error loading post types:', error);
        }
        setIsLoading(false);
    };

    const loadBetterlinkCategories = async () => {
        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_betterlink_categories',
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                setBetterlinkCategories(response.data.data);
            }
        } catch (error) {
            console.error('Error loading BetterLink categories:', error);
        }
    };

    const loadBetterlinkTags = async () => {
        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_betterlink_tags',
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                setBetterlinkTags(response.data.data);
            }
        } catch (error) {
            console.error('Error loading BetterLink tags:', error);
        }
    };

    const updatePostCount = async () => {
        if (!selectedPostType) {
            setPostCount(null);
            return;
        }

        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_posts_count',
                post_type: selectedPostType.value,
                categories: selectedCategories.map(cat => cat.value),
                tags: selectedTags.map(tag => tag.value),
                include_existing: includeExisting,
                security: betterlinks_nonce
            });

            if (response && response.data && response.data.success) {
                setPostCount(response.data.data.count || 0);
            } else {
                console.error('API response error:', response);
                setPostCount(0);
            }
        } catch (error) {
            console.error('Error getting post count:', error);
            console.error('Error details:', {
                selectedPostType: selectedPostType,
                selectedCategories: selectedCategories,
                selectedTags: selectedTags,
                includeExisting: includeExisting
            });
            setPostCount(0);
        }
    };

    const handleCountPosts = async () => {
        setCountLoading(true);
        await updatePostCount();
        setCountLoading(false);
    };

    const handleGenerate = () => {
        if (!selectedPostType) {
            alert(__('Please select a post type.', 'betterlinks'));
            return;
        }
        if (postCount === 0) {
            alert(__('No posts found for the selected criteria. Please adjust your filters.', 'betterlinks'));
            return;
        }
        setShowConfirmation(true);
    };

    const confirmGeneration = async () => {
        setShowConfirmation(false);
        setGenerationInProgress(true);
        setGenerationStatus({
            progress_percent: 0,
            processed: 0,
            total: postCount,
            successful: 0,
            failed: 0,
            status: 'starting',
            message: __('Initializing bulk generation...', 'betterlinks')
        });
        setSimulatedProgress(0);
        setShowCompletionMessage(false);

        // Start simulated progress for better UX
        startSimulatedProgress();

        const filters = {
            post_type: selectedPostType.value,
            categories: selectedCategories.map(cat => cat.value),
            tags: selectedTags.map(tag => tag.value),
            post_limit: postLimit ? parseInt(postLimit) : 0,
            sorting,
            include_existing: includeExisting,
            description_length: descriptionLength,
            redirect_type: redirectType,
            target_url_source: 'permalink',
            custom_field_key: customFieldKey,
            manual_pattern: manualPattern,
            custom_tags: customTags,
            betterlink_category: selectedBetterlinkCategory ? parseInt(selectedBetterlinkCategory.value) : 0,
            betterlink_tags: selectedBetterlinkTags && selectedBetterlinkTags.length > 0 ? selectedBetterlinkTags.map(tag => parseInt(tag.value)) : [],
            link_prefix: linkPrefix,
            url_slug_generation_type: urlSlugGenerationType
        };

        // Add a small delay to show the initialization
        setTimeout(async () => {
            try {
                const response = await makeRequest({
                    action: 'betterlinks/admin/start_bulk_generation',
                    ...filters,
                    security: betterlinks_nonce
                });

                if (response.data && response.data.success) {
                    // Start polling for progress after a delay
                    setTimeout(() => {
                        pollProgress();
                    }, 2000);
                } else {
                    setGenerationInProgress(false);
                    clearProgressInterval();
                    
                    // Handle pro verification errors specifically
                    if (response.data && response.data.data && response.data.data.code === 'pro_required') {
                        openUpgradeToProModal();
                        return;
                    }
                    
                    const errorMessage = response.data && response.data.data && response.data.data.message
                        ? response.data.data.message
                        : response.data && response.data.message
                            ? response.data.message
                            : __('Failed to start generation', 'betterlinks');
                    alert(errorMessage);
                }
            } catch (error) {
                setGenerationInProgress(false);
                clearProgressInterval();
                console.error('Error starting generation:', error);
                alert(__('Error starting generation. Please try again.', 'betterlinks'));
            }
        }, 1500);
    };

    const startSimulatedProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15; // Random increment between 0-15%
            if (progress > 85) progress = 85; // Don't go beyond 85% until real data comes

            setSimulatedProgress(progress);
                console.log('pp - ', Math.floor(progress));

            setGenerationStatus(prev => ({
                ...prev,
                progress_percent: Math.floor(progress),
                message: progress < 30
                    ? __('Analyzing posts and preparing data...', 'betterlinks')
                    : progress < 60
                        ? __('Creating short links...', 'betterlinks')
                        : __('Finalizing and optimizing links...', 'betterlinks')
            }));
        }, 800); // Update every 800ms for visible progress

        setProgressInterval(interval);
    };

    const clearProgressInterval = () => {
        if (progressInterval) {
            clearInterval(progressInterval);
            setProgressInterval(null);
        }
    };

    const pollProgress = () => {
        const interval = setInterval(async () => {
            try {
                const response = await makeRequest({
                    action: 'betterlinks/admin/get_generation_progress',
                    security: betterlinks_nonce
                });

                if (response.data && response.data.success) {
                    const status = response.data.data;

                    // Clear simulated progress once we get real data
                    clearProgressInterval();

                    // Gradually update to real progress for smooth transition
                    setGenerationStatus(prev => ({
                        ...status,
                        progress_percent: Math.max(status.progress_percent || 0, simulatedProgress)
                    }));

                    if (status.status === 'completed' || status.status === 'cancelled') {
                        clearInterval(interval);

                        // Show completion with all details
                        setGenerationStatus({
                            ...status,
                            progress_percent: 100,
                            message: status.status === 'completed'
                                ? __('Generation completed successfully!', 'betterlinks')
                                : __('Generation was cancelled.', 'betterlinks')
                        });

                        // Refresh links data when generation is completed successfully
                        if (status.status === 'completed' && fetch_links_data) {
                            fetch_links_data();
                        }

                        // Show completion message - no auto-dismiss, user must click OK
                        setShowCompletionMessage(true);
                        setShowAdvanced(false);
                    }
                }
            } catch (error) {
                console.error('Error polling progress:', error);
                clearInterval(interval);
                clearProgressInterval();
                setGenerationInProgress(false);
            }
        }, 3000); // Poll every 3 seconds for real data
    };

    const postTypeOptions = postTypes.map(pt => ({
        value: pt.name,
        label: pt.label
    }));

    const sortingOptions = [
        { value: 'date_desc', label: __('Created Date (Newest First)', 'betterlinks') },
        { value: 'date_asc', label: __('Created Date (Oldest First)', 'betterlinks') },
        { value: 'title_asc', label: __('Title (A-Z)', 'betterlinks') },
        { value: 'title_desc', label: __('Title (Z-A)', 'betterlinks') }
    ];

    const redirectTypeOptions = [
        { value: '301', label: __('301 (Permanent)', 'betterlinks') },
        { value: '302', label: __('302 (Temporary)', 'betterlinks') },
        { value: '307', label: __('307 (Temporary)', 'betterlinks') }
    ];



    return (
        <div className="btl-short-link-generator">
            {/* Upgrade to Pro Modal */}
            <UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />

            {/* Pro Feature Check */}
            {!is_pro_enabled ? (
                // <div className="btl-pro-feature-preview">
                //     {/* Static Preview of the Form */}
                //     <div className="btl-pro-form-preview">
                //         <div className="btl-header">
                //             <h2>{__('Short Link Generator', 'betterlinks')}</h2>
                //             <div className="btl-description">
                //                 {__('Generate short links in bulk based on your selected filters. This tool will create BetterLinks for posts matching your criteria.', 'betterlinks')}
                //             </div>
                //         </div>

                //         <div className="btl-generator-form btl-pro-disabled">
                //             {/* Step 1: Required Inputs */}
                //             <div className="btl-form-section">
                //                 <h3>{__('Required Settings:', 'betterlinks')}</h3>

                //                 <div className="btl-form-row">
                //                     <div className="btl-form-col">
                //                         <div className="btl-bulk-link-form-group" onClick={openUpgradeToProModal}>
                //                             <label>{__('Post Type', 'betterlinks')}*</label>
                //                             <Select
                //                                 className="btl-custom-post-select-type"
                //                                 value={{ value: 'post', label: 'Posts' }}
                //                                 options={[
                //                                     { value: 'post', label: 'Posts' },
                //                                     { value: 'page', label: 'Pages' },
                //                                     { value: 'product', label: 'Products' }
                //                                 ]}
                //                                 placeholder={__('Select post type...', 'betterlinks')}
                //                                 isDisabled={true}
                //                                 isClearable={false}
                //                             />
                //                         </div>
                //                     </div>

                //                     <div className="btl-form-col">
                //                         <div className="btl-bulk-link-form-group" onClick={openUpgradeToProModal}>
                //                             <label>{__('Categories', 'betterlinks')}</label>
                //                             <Select
                //                                 className="btl-custom-post-select-cat"
                //                                 value={[
                //                                     { value: 1, label: 'Technology' },
                //                                     { value: 2, label: 'WordPress' }
                //                                 ]}
                //                                 options={[
                //                                     { value: 1, label: 'Technology' },
                //                                     { value: 2, label: 'WordPress' },
                //                                     { value: 3, label: 'Web Development' }
                //                                 ]}
                //                                 placeholder={__('Select categories...', 'betterlinks')}
                //                                 isMulti
                //                                 isDisabled={true}
                //                                 isClearable
                //                                 closeMenuOnSelect={false}
                //                             />
                //                         </div>
                //                     </div>
                //                 </div>

                //                 <div className="btl-post-count" onClick={openUpgradeToProModal}>
                //                     {__('Posts found:', 'betterlinks')} 147
                //                 </div>
                //             </div>

                //             {/* Step 2: Advanced Filters */}
                //             <div className="btl-form-section btl-bg-white">
                //                 <div className="btl-accordion-header">
                //                     <h3>{__('Advanced Filters', 'betterlinks')}</h3>
                //                     <span className="btl-accordion-arrow open">
                //                         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                //                             <path d="M5 7.5L10 12.5L15 7.5" stroke="#19285D" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                //                         </svg>
                //                     </span>
                //                 </div>

                //                 <div className="btl-accordion-content">
                //                     {/* Sorting */}
                //                     <div className="btl-subsection">
                //                         <div className="btl-form-row">
                //                             <div className="btl-form-col">
                //                                 <div className="btl-bulk-link-form-group" onClick={openUpgradeToProModal}>
                //                                     <label>{__('Sorting', 'betterlinks')}</label>
                //                                     <Select
                //                                         value={{ value: 'date_desc', label: __('Created Date (Newest First)', 'betterlinks') }}
                //                                         options={[
                //                                             { value: 'date_desc', label: __('Created Date (Newest First)', 'betterlinks') },
                //                                             { value: 'date_asc', label: __('Created Date (Oldest First)', 'betterlinks') },
                //                                             { value: 'title_asc', label: __('Title (A-Z)', 'betterlinks') },
                //                                             { value: 'title_desc', label: __('Title (Z-A)', 'betterlinks') }
                //                                         ]}
                //                                         isDisabled={true}
                //                                         isClearable={false}
                //                                         className="btl-custom-post-select-type"
                //                                     />
                //                                 </div>
                //                             </div>

                //                             <div className="btl-form-col">
                //                                 <div className="btl-bulk-link-form-group btl-bulk-existing-links" onClick={openUpgradeToProModal}>
                //                                     <div className="btl-bulk-checkbox-field">
                //                                         <input
                //                                             type="checkbox"
                //                                             id="overwrite-utm-preview"
                //                                             checked={true}
                //                                             disabled={true}
                //                                             readOnly
                //                                         />
                //                                         <label htmlFor="overwrite-utm-preview">{__('Overwrite Existing Link', 'betterlinks')}</label>
                //                                     </div>
                //                                     <p className="btl-helper-text">{__('Regenerate links for posts that already have them', 'betterlinks')}</p>
                //                                 </div>
                //                             </div>
                //                         </div>
                //                     </div>

                //                     {/* Short Link Configuration */}
                //                     <div className="btl-subsection">
                //                         <h4>{__('Short Link Configuration', 'betterlinks')}</h4>

                //                         <div className="btl-form-col">
                //                             <div className="btl-bulk-link-form-group" onClick={openUpgradeToProModal}>
                //                                 <label>{__('Redirect Type', 'betterlinks')}</label>
                //                                 <Select
                //                                     value={{ value: '301', label: __('301 (Permanent)', 'betterlinks') }}
                //                                     options={[
                //                                         { value: '301', label: __('301 (Permanent)', 'betterlinks') },
                //                                         { value: '302', label: __('302 (Temporary)', 'betterlinks') },
                //                                         { value: '307', label: __('307 (Temporary)', 'betterlinks') }
                //                                     ]}
                //                                     isDisabled={true}
                //                                     isClearable={false}
                //                                     className="btl-custom-post-select-type"
                //                                 />
                //                             </div>
                //                         </div>

                //                         <div className="btl-form-col">
                //                             <div className="btl-bulk-link-form-group" onClick={openUpgradeToProModal}>
                //                                 <label>{__('Link Prefix', 'betterlinks')}</label>
                //                                 <input
                //                                     className="btl-text-field"
                //                                     type="text"
                //                                     value="go"
                //                                     readOnly
                //                                     placeholder="go"
                //                                     onClick={openUpgradeToProModal}
                //                                 />
                //                                 <p className="btl-helper-text">
                //                                     {__('The prefix will be added before your shortened URL\'s slug eg. http://localhost:10018/go/your-link-name', 'betterlinks')}
                //                                 </p>
                //                             </div>
                //                         </div>

                //                         <div className="btl-form-row">
                //                             <div className="btl-form-col">
                //                                 <div className="btl-bulk-link-form-group" onClick={openUpgradeToProModal}>
                //                                     <label>{__('Shortened URL Type', 'betterlinks')}</label>
                //                                     <Select
                //                                         value={{ value: 'existing', label: __('Existing Slug', 'betterlinks') }}
                //                                         options={[
                //                                             { value: 'existing', label: __('Existing Slug', 'betterlinks') },
                //                                             { value: 'random', label: __('Random', 'betterlinks') }
                //                                         ]}
                //                                         isDisabled={true}
                //                                         isClearable={false}
                //                                         className="btl-custom-post-select-type"
                //                                     />
                //                                 </div>
                //                             </div>
                //                             <div className="btl-form-col">
                //                                 <div className="btl-bulk-link-form-group" onClick={openUpgradeToProModal}>
                //                                     <label>{__('BetterLink Category', 'betterlinks')}</label>
                //                                     <Select
                //                                         value={{ value: 1, label: 'Marketing Links' }}
                //                                         options={[
                //                                             { value: 1, label: 'Marketing Links' },
                //                                             { value: 2, label: 'Product Links' },
                //                                             { value: 3, label: 'Social Media' }
                //                                         ]}
                //                                         placeholder={__('Select BetterLink category...', 'betterlinks')}
                //                                         isDisabled={true}
                //                                         isClearable={true}
                //                                         isSearchable={true}
                //                                         className="btl-custom-post-select-type"
                //                                     />
                //                                 </div>
                //                             </div>
                //                         </div>

                //                         <div className="btl-form-col">
                //                             <div className="btl-bulk-link-form-group" onClick={openUpgradeToProModal}>
                //                                 <label>{__('BetterLink Tags', 'betterlinks')}</label>
                //                                 <Select
                //                                     value={[
                //                                         { value: 1, label: 'automated' },
                //                                         { value: 2, label: 'bulk-generated' }
                //                                     ]}
                //                                     options={[
                //                                         { value: 1, label: 'automated' },
                //                                         { value: 2, label: 'bulk-generated' },
                //                                         { value: 3, label: 'wordpress' },
                //                                         { value: 4, label: 'content' }
                //                                     ]}
                //                                     placeholder={__('Select BetterLink tags.....', 'betterlinks')}
                //                                     isDisabled={true}
                //                                     isClearable={true}
                //                                     isSearchable={true}
                //                                     isMulti={true}
                //                                     closeMenuOnSelect={false}
                //                                     className="btl-custom-post-select-type"
                //                                 />
                //                             </div>
                //                         </div>
                //                     </div>
                //                 </div>
                //             </div>

                //             {/* Action Buttons */}
                //             <div className="btl-form-actions">
                //                 <button
                //                     className="btl-btn btl-btn-primary"
                //                     onClick={openUpgradeToProModal}
                //                 >
                //                     {__('Generate Short Links', 'betterlinks')} (147)
                //                 </button>
                //             </div>
                //         </div>
                //     </div>
                // </div>
                <div></div>
            ) : (
                <>

            <div className="btl-header bl-text-white">
                <h2>{__('Short Link Generator', 'betterlinks')}</h2>
                <div className="btl-description">
                    {__('Generate short links in bulk based on your selected filters. This tool will create BetterLinks for posts matching your criteria.', 'betterlinks')}
                </div>
            </div>

            {!generationInProgress ? (
                <>
                    <div className="btl-generator-form">
                        {/* Step 1: Required Inputs */}
                        <div className="btl-form-section">
                            <h3>{__('Required Settings:', 'betterlinks')}</h3>

                            <div className="btl-form-row">
                                <div className="btl-form-col">
                                    <div className="btl-bulk-link-form-group">
                                        <label>{__('Post Type', 'betterlinks')}*</label>
                                        <Select
                                            className="btl-custom-post-select-type"
                                            classNamePrefix="btl-react-select"
                                            value={selectedPostType}
                                            onChange={setSelectedPostType}
                                            options={postTypeOptions}
                                            placeholder={__('Select post type...', 'betterlinks')}
                                            isLoading={isLoading}
                                            isClearable={false}
                                        />
                                    </div>
                                </div>

                                {selectedPostType  && categories.length > 0 && (
                                    <div className="btl-form-col">
                                        <div className="btl-bulk-link-form-group">
                                            <label>{__('Categories', 'betterlinks')}</label>
                                            {categories.length === 0 ? (
                                                <div className="btl-helper-text">
                                                    {__('This post type has no categories available.', 'betterlinks')}
                                                </div>
                                            ) : (
                                                <Select
                                                    className="btl-custom-post-select-cat"
                                                    classNamePrefix="btl-react-select"
                                                    value={selectedCategories}
                                                    onChange={setSelectedCategories}
                                                    options={categories}
                                                    placeholder={__('Select categories...', 'betterlinks')}
                                                    isMulti
                                                    isClearable
                                                    closeMenuOnSelect={false}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* {!selectedPostType && (
                                <div className="btl-helper-text">
                                    {__('Please select a post type to see available categories.', 'betterlinks')}
                                </div>
                            )} */}

                            {postCount !== null && (
                                <div className={`btl-post-count ${postCount === 0 ? 'btl-post-count-warning' : ''}`}>
                                    {postCount === 0
                                        ? __('No posts found with current filters', 'betterlinks')
                                        : `${__('Posts found:', 'betterlinks')} ${postCount}`
                                    }
                                </div>
                            )}
                        </div>

                        {/* Step 2: Advanced Filters */}
                        <div className="btl-form-section btl-bg-white">
                            <div
                                className="btl-accordion-header"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                            >
                                <h3>{__('Advanced Filters', 'betterlinks')}</h3>
                                <span className={`btl-accordion-arrow ${showAdvanced ? 'open' : ''}`}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#19285D" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>

                            {showAdvanced && (
                                <div className="btl-accordion-content">
                                    {/* Sorting */}
                                    <div className="btl-subsection">
                                        <div className="btl-form-row">
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Sorting', 'betterlinks')}</label>
                                                    <Select
                                                        value={sortingOptions.find(opt => opt.value === sorting)}
                                                        onChange={(option) => setSorting(option.value)}
                                                        options={sortingOptions}
                                                        isClearable={false}
                                                        className="btl-custom-post-select-type"
                                                        classNamePrefix="btl-react-select"
                                                    />
                                                </div>
                                            </div>

                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group btl-bulk-existing-links">
                                                    <div className=" btl-bulk-checkbox-field">
                                                        <input
                                                            type="checkbox"
                                                            id="overwrite-utm"
                                                            checked={includeExisting}
                                                            onChange={(e) => setIncludeExisting(e.target.checked)}
                                                        />
                                                        <label htmlFor="overwrite-utm">{__('Overwrite Existing Link', 'betterlinks')}</label>
                                                    </div>
                                                    <p className="btl-helper-text">{__('Regenerate links for posts that already have them', 'betterlinks')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Short Link Configuration */}
                                    <div className="btl-subsection">
                                        <h4>{__('Short Link Configuration', 'betterlinks')}</h4>

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Redirect Type', 'betterlinks')}</label>
                                                <Select
                                                    value={redirectTypeOptions.find(opt => opt.value === redirectType)}
                                                    onChange={(option) => setRedirectType(option.value)}
                                                    options={redirectTypeOptions}
                                                    isClearable={false}
                                                    className="btl-custom-post-select-type"
                                                    classNamePrefix="btl-react-select"
                                                />
                                            </div>
                                        </div>
                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Link Prefix', 'betterlinks')}</label>
                                                <input
                                                    className="btl-text-field"
                                                    type="text"
                                                    value={linkPrefix}
                                                    onChange={(e) => setLinkPrefix(e.target.value)}
                                                    placeholder="Go"
                                                />
                                                <p className="btl-helper-text">
                                                    {__('The prefix will be added before your shortened URL\'s slug eg. http://localhost:10018/go/your-link-name', 'betterlinks')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="btl-form-row">
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Shortened URL Type', 'betterlinks')}</label>
                                                    <Select
                                                        value={urlGenerationTypes.find(opt => opt.value === urlSlugGenerationType)}
                                                        onChange={(option) => setUrlSlugGenerationType(option.value)}
                                                        options={urlGenerationTypes}
                                                        isClearable={false}
                                                        className="btl-custom-post-select-type"
                                                        classNamePrefix="btl-react-select"
                                                    />
                                                </div>
                                            </div>
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('BetterLink Category', 'betterlinks')}</label>
                                                    <Select
                                                        value={selectedBetterlinkCategory}
                                                        onChange={setSelectedBetterlinkCategory}
                                                        options={betterlinkCategories}
                                                        placeholder={__('Select BetterLink category...', 'betterlinks')}
                                                        isClearable={true}
                                                        isLoading={betterlinkCategories.length === 0}
                                                        isSearchable={true}
                                                        className="btl-custom-post-select-type"
                                                        classNamePrefix="btl-react-select"
                                                        noOptionsMessage={({ inputValue }) =>
                                                            inputValue ? __('No categories found', 'betterlinks') : __('No categories available', 'betterlinks')
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('BetterLink Tags', 'betterlinks')}</label>
                                                <Select
                                                    value={selectedBetterlinkTags}
                                                    onChange={setSelectedBetterlinkTags}
                                                    options={betterlinkTags}
                                                    placeholder={__('Select BetterLink tags.....', 'betterlinks')}
                                                    isClearable={true}
                                                    isLoading={betterlinkTags.length === 0}
                                                    isSearchable={true}
                                                    isMulti={true}
                                                    closeMenuOnSelect={false}
                                                    className="btl-custom-post-select-type"
                                                    classNamePrefix="btl-react-select"
                                                    noOptionsMessage={({ inputValue }) =>
                                                        inputValue ? __('No tags found', 'betterlinks') : __('No tags available', 'betterlinks')
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Confirmation Modal */}
                        {showConfirmation && (
                            <div className="btl-modal-overlay btl-fade-in" onClick={() => setShowConfirmation(false)}>
                                <div className="btl-confirmation-modal btl-slide-in" onClick={(e) => e.stopPropagation()}>
                                    {/* Modal Header */}
                                    <div className="btl-confirmation-header">
                                        <div className="btl-confirmation-header-content">
                                            <div className="btl-confirmation-title">{__('Confirm Bulk Generation', 'betterlinks')}</div>
                                            <div className="btl-confirmation-subtitle">{__('Please review your settings before proceeding', 'betterlinks')}</div>
                                        </div>
                                        <button
                                            className="btl-confirmation-close"
                                            onClick={() => setShowConfirmation(false)}
                                            aria-label={__('Close', 'betterlinks')}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="btl-confirmation-body">
                                        {/* Two Column Layout */}
                                        <div className="btl-confirmation-grid">
                                            {/* Content Selection */}
                                            <div className="btl-confirmation-section">
                                                <div className="btl-conf-pre-title btl-confirmation-content-title">{__('Content Selection', 'betterlinks')}</div>
                                                <div className="btl-confirmation-content-content">
                                                    <div className="btl-confirmation-post-type">
                                                        <span className="btl-confirmation-label">{__('Post Type:', 'betterlinks')}</span>
                                                        <span className="btl-confirmation-tag btl-tag-primary">{selectedPostType.label}</span>
                                                    </div>

                                                    <div className="btl-confirmation-field">
                                                        <span className="btl-confirmation-label">{__('Categories:', 'betterlinks')}</span>
                                                        <div className="btl-confirmation-tags-list">
                                                            {selectedCategories.length > 0 ? (
                                                                selectedCategories.map((cat, index) => (
                                                                    <span key={index} className="btl-confirmation-tag btl-tag-category">{cat.label}</span>
                                                                ))
                                                            ) : (
                                                                <span className="btl-confirmation-empty">{__('All categories', 'betterlinks')}</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {selectedTags.length > 0 && (
                                                        <div className="btl-confirmation-field">
                                                            <span className="btl-confirmation-label">{__('Tags:', 'betterlinks')}</span>
                                                            <div className="btl-confirmation-tags-list">
                                                                {selectedTags.map((tag, index) => (
                                                                    <span key={index} className="btl-confirmation-tag btl-tag-default">{tag.label}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Link Configuration */}
                                            <div className="btl-confirmation-section">
                                                <div className="btl-conf-pre-title btl-confirmation-link-title">{__('Link Configuration', 'betterlinks')}</div>
                                                <div className="btl-confirmation-link-content">
                                                    <div className="btl-confirmation-field">
                                                        <span className="btl-confirmation-label">{__('Redirect Type:', 'betterlinks')}</span>
                                                        <span className="btl-confirmation-value">{redirectType}</span>
                                                    </div>

                                                    <div className="btl-confirmation-field">
                                                        <span className="btl-confirmation-label">{__('Link Prefix:', 'betterlinks')}</span>
                                                        <span className="btl-confirmation-value">{linkPrefix}</span>
                                                    </div>

                                                    {selectedBetterlinkCategory && (
                                                        <div className="btl-confirmation-field">
                                                            <span className="btl-confirmation-label">{__('BetterLinks Category:', 'betterlinks')}</span>
                                                            <span className="btl-confirmation-value">{selectedBetterlinkCategory.label}</span>
                                                        </div>
                                                    )}

                                                    {selectedBetterlinkTags.length > 0 && (
                                                        <div className="btl-confirmation-field">
                                                            <span className="btl-confirmation-label">{__('BetterLinks Tags:', 'betterlinks')}</span>
                                                            <div className="btl-confirmation-tags-list">
                                                                {selectedBetterlinkTags.map((tag, index) => (
                                                                    <span key={index} className="btl-confirmation-tag btl-tag-default">{tag.label}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Posts to Process Summary */}
                                        <div className="btl-confirmation-summary">
                                            <div className="btl-confirmation-summary-count">
                                               {postCount}
                                            </div>
                                            <div className="btl-confirmation-summary-content">
                                                <div className="btl-confirmation-summary-title">{__('Posts to Process', 'betterlinks')}</div>
                                                <div className="btl-confirmation-summary-subtitle">
                                                    {__('Estimated time:', 'betterlinks')} {Math.ceil(postCount / 10)} {__('minutes', 'betterlinks')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="btl-confirmation-footer">
                                        <button
                                            className="btl-confirmation-btn btl-confirmation-btn-secondary"
                                            onClick={() => setShowConfirmation(false)}
                                        >
                                            {__('Edit', 'betterlinks')}
                                        </button>
                                        <button
                                            className="btl-confirmation-btn btl-confirmation-btn-primary"
                                            onClick={confirmGeneration}
                                        >
                                            {__('Start Generation', 'betterlinks')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Action Buttons */}
                    <div className="btl-form-actions">
                        <button
                            className="btl-btn btl-btn-primary"
                            onClick={handleGenerate}
                            disabled={!selectedPostType || isLoading || generationInProgress || postCount === 0}
                        >
                            {isLoading || generationInProgress ? (
                                <>
                                    <span className="btl-spinner"></span>
                                    {__('Loading...', 'betterlinks')}
                                </>
                            ) : (
                                <>
                                    {__('Generate Short Links', 'betterlinks')}
                                    {postCount !== null && postCount > 0 && (
                                        <> ({postCount})</>
                                    )}
                                </>
                            )}
                        </button>
                    </div>
                </>
            ) : (
                /* Progress Display */
                <div className="btl-progress-container btl-fade-in">
                    {generationStatus && (
                        <>
                            {/* Check if generation is completed */}
                            {generationStatus.status === 'completed' ? (
                                <>
                                <div className="btl-completion-container btl-fade-in">
                                    <div className="btl-completion-main">
                                        {/* Completion Circle */}
                                        <div className="btl-completion-circle">
                                            <div className="btl-completion-progress-circle">
                                                <svg width="64" height="64" viewBox="0 0 120 120" className="btl-completion-progress-svg">
                                                    {/* Background circle */}
                                                    <circle
                                                        cx="60"
                                                        cy="60"
                                                        r="50"
                                                        stroke="#E5E7EB"
                                                        strokeWidth="12"
                                                        fill="none"
                                                    />
                                                    {/* Completed progress circle - full 100% */}
                                                    <circle
                                                        cx="60"
                                                        cy="60"
                                                        r="50"
                                                        stroke="#10B981"
                                                        strokeWidth="12"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeDasharray={`${2 * Math.PI * 50}`}
                                                        strokeDashoffset="0"
                                                        transform="rotate(-90 60 60)"
                                                        className="btl-completion-progress-fill"
                                                    />
                                                </svg>
                                                <div className="btl-completion-percentage-display">
                                                    <span className="btl-completion-percent-text">100%</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Completion Content */}
                                        <div className="btl-completion-content-main">
                                            <div className="btl-completion-title">{__('Generation in Progress', 'betterlinks')}</div>
                                            <div className="btl-completion-subtitle">
                                                {`${__('Successfully generated', 'betterlinks')} ${generationStatus.successful || 0} ${__('short links', 'betterlinks')}.`}
                                            </div>
                                        </div>
                                        
                                        {/* Time Display */}
                                        <div className="btl-completion-time">
                                            {generationStatus.message && (
                                                <div className="btl-time-message">{__('Generation Completed!', 'betterlinks')}</div>
                                            )}
                                        </div>
                                        
                                        {/* OK Button */}
                                    </div>
                                    
                                    {/* Statistics on the right */}
                                    <div className="btl-completion-stats">
                                        <div className="btl-completion-stat-item btl-stat-processed">
                                            <div className="btl-completion-stat-icon btl-stat-processed-icon">
                                                <img src={plugin_root_url + 'assets/images/icons/progress.svg'} alt="" />
                                            </div>
                                            <div className="btl-completion-stat-content">
                                                <div className="btl-completion-stat-number">{generationStatus.processed || 0}</div>
                                                <div className="btl-completion-stat-label">{__('Processed', 'betterlinks')}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="btl-completion-stat-item btl-stat-total">
                                            <div className="btl-completion-stat-icon btl-stat-total-icon">
                                               <img src={plugin_root_url + 'assets/images/icons/layout-list.svg'} alt="" />
                                            </div>
                                            <div className="btl-completion-stat-content">
                                                <div className="btl-completion-stat-number">{postCount || 0}</div>
                                                <div className="btl-completion-stat-label">{__('Total Posts', 'betterlinks')}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="btl-completion-stat-item btl-stat-success">
                                            <div className="btl-completion-stat-icon btl-stat-success-icon">
                                                <img src={plugin_root_url + 'assets/images/icons/circle-checked.svg'} alt="" />
                                            </div>
                                            <div className="btl-completion-stat-content">
                                                <div className="btl-completion-stat-number">{generationStatus.successful || 0}</div>
                                                <div className="btl-completion-stat-label">{__('Successful', 'betterlinks')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ) : (
                                /* Progress State */
                                <div className="btl-progress-main-container">
                                    <div className="btl-progress-main">
                                        {/* Circular Progress */}
                                        <div className="btl-progress-circle-container">
                                            <div className="btl-progress-circle">
                                                <svg width="64" height="64" viewBox="0 0 200 200" className="btl-progress-svg">
                                                    {/* Background circle */}
                                                    <circle
                                                        cx="100"
                                                        cy="100"
                                                        r="80"
                                                        stroke="#E5E7EB"
                                                        strokeWidth="12"
                                                        fill="none"
                                                    />
                                                    {/* Progress circle */}
                                                    <circle
                                                        cx="100"
                                                        cy="100"
                                                        r="80"
                                                        stroke="#3B82F6"
                                                        strokeWidth="12"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeDasharray={`${2 * Math.PI * 80}`}
                                                        strokeDashoffset={`${2 * Math.PI * 80 * (1 - (generationStatus.progress_percent || 0) / 100)}`}
                                                        transform="rotate(-90 100 100)"
                                                        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                                                    />
                                                </svg>
                                                <div className="btl-progress-percentage-display">
                                                    <span className="btl-progress-percent-text">{generationStatus.progress_percent || 0}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Progress Content */}
                                        <div className="btl-progress-content-main">
                                            <h3 className="btl-progress-title">{__('Generation in Progress', 'betterlinks')}</h3>
                                            <p className="btl-progress-subtitle">
                                                {generationStatus.message || __('Analyzing posts and preparing data...', 'betterlinks')}
                                            </p>
                                            
                                            {/* Time Left */}
                                            {generationStatus.progress_percent > 0 && generationStatus.progress_percent < 100 && (
                                                <div className="btl-progress-time-left">
                                                    <span className="btl-time-label">{__('Time left:', 'betterlinks')}</span>
                                                    <span className="btl-time-value">
                                                        {(() => {
                                                            const remainingPercent = 100 - generationStatus.progress_percent;
                                                            const estimatedMinutes = Math.ceil((remainingPercent / 100) * Math.ceil((generationStatus.total || 1) / 10));
                                                            return estimatedMinutes > 0 ? `${estimatedMinutes} ${__('mins', 'betterlinks')}` : __('Almost done', 'betterlinks');
                                                        })()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Statistics on the right */}
                                    <div className="btl-progress-stats">
                                        <div className="btl-progress-stat-item btl-stat-processed">
                                            <div className="btl-progress-stat-icon btl-stat-processed-icon">
                                                <img src={plugin_root_url + 'assets/images/icons/progress.svg'} alt="" />
                                            </div>
                                            <div className="btl-progress-stat-content">
                                                <div className="btl-progress-stat-number">{generationStatus.processed || 0}</div>
                                                <div className="btl-progress-stat-label">{__('Processed', 'betterlinks')}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="btl-progress-stat-item btl-stat-total">
                                            <div className="btl-progress-stat-icon btl-stat-total-icon">
                                               <img src={plugin_root_url + 'assets/images/icons/layout-list.svg'} alt="" />
                                            </div>
                                            <div className="btl-progress-stat-content">
                                                <div className="btl-progress-stat-number">{postCount || 0}</div>
                                                <div className="btl-progress-stat-label">{__('Total Posts', 'betterlinks')}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="btl-progress-stat-item btl-stat-success">
                                            <div className="btl-progress-stat-icon btl-stat-success-icon">
                                                <img src={plugin_root_url + 'assets/images/icons/circle-checked.svg'} alt="" />
                                            </div>
                                            <div className="btl-progress-stat-content">
                                                <div className="btl-progress-stat-number">{generationStatus.successful || 0}</div>
                                                <div className="btl-progress-stat-label">{__('Successful', 'betterlinks')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
            {/* OK Button */}
            {
                generationStatus?.status === 'completed' && (
                <button 
                    className="btl-btn btl-btn-primary btl-completion-ok-btn"
                    onClick={() => {
                        setGenerationInProgress(false);
                        setGenerationStatus(null);
                        setShowCompletionMessage(false);
                        // Reset form if needed
                        setSelectedPostType(null);
                        setSelectedCategories([]);
                        setPostCount(null);
                        // Refresh links data to show newly generated links
                        if (fetch_links_data) {
                            fetch_links_data();
                        }
                    }}
                >
                    {__('Okay', 'betterlinks')}
                </button>
                )
            }
            </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    settings: state.settings?.settings || {},
});

const mapDispatchToProps = (dispatch) => ({
    fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortLinkGenerator);
